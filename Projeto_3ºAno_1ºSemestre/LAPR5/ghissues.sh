#!/bin/bash

# Replace these variables with your own values
CSV_FILE="SPRINT3.csv"
REPO_OWNER="JoseTeixeira1200941"
REPO_NAME="G046"

# Check if the CSV file exists
if [[ ! -f "$CSV_FILE" ]]; then
    echo "Error: CSV file '$CSV_FILE' does not exist."
    exit 1
fi

# Read the header line of the CSV file to capture field names
IFS=';' read -r -a headers < "$CSV_FILE"

# Loop through the CSV file and create issues, skipping the header line
tail -n +2 "$CSV_FILE" | while IFS=';' read -r -a values; do
  declare -A data  # Associative array to hold the data
  
  # Extract values for each field using the header as a reference
  for ((i = 0; i < ${#headers[@]}; i++)); do
    header=${headers[i]}
    value=${values[i]}
    data["$header"]="$value"
  done

  ISSUE_TITLE="${data[Sprint]} ${data[Módulo]} ${data[ID]}"
  ISSUE_BODY="**Correspondence between US de Sprint A e Sprint B:** ${data[Correspondência entre US de Sprint A e Sprint B]}
**U.S./Req. Observation:** ${data[U.S./Req.]} ${data[Observations]}"

  # Create the issue using 'gh'   
  if ! gh issue create --title "$ISSUE_TITLE" --body "$ISSUE_BODY" --repo "$REPO_OWNER/$REPO_NAME"; then
    echo "Failed to create issue: $ISSUE_TITLE"
    # You can break the loop or continue depending on how you want to handle the error
    # break
  else
    echo "Successfully created issue: $ISSUE_TITLE"
  fi

  # Sleep for 1 second before processing the next command
  sleep 5
done

# Note: If this script is meant to be used in an environment where 'gh' is not in the default PATH,
# you may need to specify the full path to 'gh' or modify the PATH variable within the script.
