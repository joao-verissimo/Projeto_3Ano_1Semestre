import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import robot from './routes/robotRoute';
import room from './routes/roomRoute';
import lift from './routes/liftRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	floor(app);
	robot(app);
	room(app);
	lift(app);

	return app
}