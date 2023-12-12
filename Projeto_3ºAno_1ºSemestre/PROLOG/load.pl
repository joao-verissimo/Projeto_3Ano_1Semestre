:- use_module(library(http/http_client)).
:- use_module(library(http/json)).
:- dynamic building/4.
:- dynamic floor/3.
:- dynamic connection/5.
:- dynamic ligacel/2.

% API 
buildings_url("http://localhost:4000/api/buildings/").
floors_url("http://localhost:4000/api/floors/").
connections_url("http://localhost:4000/api/buildingpassages/").
elevators_url("http://localhost:4000/api/lift/").

fetch_and_assert_data :-
    fetch_buildings,
    fetch_floors,
    fetch_connections.

fetch_buildings :-
    buildings_url(URL),
    http_get(URL, JSONAtom, []),
    atom_json_term(JSONAtom, Buildings, []),
    assert_buildings(Buildings).

assert_buildings([]).
assert_buildings([H|T]) :-
    assertz(building(H.id, H.name, H.localizationoncampus, H.floors)),
    assert_buildings(T).

fetch_floors :-
    floors_url(URL),
    http_get(URL, JSONAtom, []),
    atom_json_term(JSONAtom, Floors, []),   
    assert_floors(Floors).

assert_floors([]).
assert_floors([H|T]) :-
    assertz(floor(H.id, H.building, H.name)),
    assert_floors(T).

fetch_connections :-
    connections_url(URL),
    http_get(URL, JSONAtom, []),
    atom_json_term(JSONAtom, Connections, []),
    assert_connections(Connections).

assert_connections([]).
assert_connections([H|T]) :-
    assertz(connection(H.id, H.building1Id, H.building2Id, H.floor1Id, H.floor2Id)),
    assert_connections(T).

construct_graph :-
    assert_floor_connections,
    assert_building_connections.

assert_floor_connections :-
    forall(floor(FloorID, _Building, _Name), 
           (forall(connection(_ConnID, _Building1, _Building2, Floor1ID, Floor2ID),
                   ( (FloorID == Floor1ID ; FloorID == Floor2ID),
                     assertz(ligacel(floor(Floor1ID), floor(Floor2ID)))
                   )
           )
    )).

assert_building_connections :-
    forall(building(BuildingID, _Name, _Localization, _Floors), 
           (forall(connection(_ConnID, Building1ID, Building2ID, _Floor1ID, _Floor2ID),
                   ( (BuildingID == Building1ID ; BuildingID == Building2ID),
                     assertz(ligacel(building(Building1ID), building(Building2ID)))
                   )
           )
    )).

dfs(Orig, Dest, Cam) :-
    dfs2(Orig, Dest, [Orig], Cam).

dfs2(Dest, Dest, LA, Cam) :-
    reverse(LA, Cam).

dfs2(Act, Dest, LA, Cam) :-
    ligacel(Act, X),
    \+ member(X, LA),
    dfs2(X, Dest, [X|LA], Cam).

bfs(Orig, Dest, Cam) :-
    bfs2(Dest, [[Orig]], Cam).

bfs2(Dest, [[Dest|T]|_], Cam) :-
    reverse([Dest|T], Cam).

bfs2(Dest, [LA|Outros], Cam) :-
    LA = [Act|_],
    findall([X|LA],
        (Dest \== Act, ligacel(Act, X), \+ member(X, LA)),
        Novos),
    append(Outros, Novos, Todos),
    bfs2(Dest, Todos, Cam).

load_and_construct_graph :-
    fetch_and_assert_data,
    construct_graph.

clear_data :-
    retractall(building(_, _, _, _)),
    retractall(floor(_, _, _)),
    retractall(connection(_, _, _, _, _)),
    retractall(ligacel(_, _)).

