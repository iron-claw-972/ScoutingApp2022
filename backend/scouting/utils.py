BASE_MATCH_FORM_SCHEMA = [
    {
        "id": "id",
        "label": "ID",
        "type": "hidden",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Required field"]}],
    },
    {
        "id": "match_key",
        "label": "Match Key",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Required field"]}],
    },
    {
        "id": "scouter_name",
        "label": "Scouter Name",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Required field"]}],
    },
    {
        "id": "team_number",
        "label": "Team Number",
        "type": "number",
        "validationType": "number",
        "validations": [
            {"type": "required", "params": ["Required field"]},
            {"type": "integer", "params": ["Must be an integer"]},
            {"type": "min", "params": [1, "Must be positive"]},
            {"type": "max", "params": [9999, "Cannot exceed 9999"]},
        ],
    },
    {
        "id": "driver_station",
        "label": "Driver Station",
        "type": "radio",
        "validationType": "string",
        "options": ["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"],
        "validations": [
            {"type": "required", "params": ["Required field"]}
        ],
    },
]

DEFAULT_MATCH_FORM_SCHEMA = [
    {
        "id": "auto_high_scored",
        "label": "Cargo scored in Upper Hub during Auto",
        "type": "numberspinner",
        "value": "0",
        "validationType": "number",
        "validations": [
            {"type": "required", "params": ["Required field"]},
            {"type": "integer", "params": ["Must be an integer"]},
            {"type": "min", "params": [0, "Must be positive"]},
        ],
    },
    {
        "id": "auto_low_scored",
        "label": "Cargo scored in Lower Hub during Auto",
        "type": "numberspinner",
        "value": "0",
        "validationType": "number",
        "validations": [
            {"type": "required", "params": ["Required field"]},
            {"type": "integer", "params": ["Must be an integer"]},
            {"type": "min", "params": [0, "Must be positive"]},
        ],
    },
    {
        "id": "auto_notes",
        "label": "Notes for Auto",
        "type": "textarea",
        "validationType": "string",
        "validations": [
            {"type": "required", "params": ["Required field"]},
        ],
    },
]

def get_default_match_form_schema():
    return DEFAULT_MATCH_FORM_SCHEMA

BASE_PIT_FORM_SCHEMA = [
    {
        "id": "id",
        "label": "ID",
        "type": "hidden",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Required field"]}],
    },
    {
        "id": "event_key",
        "label": "Event Key",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Required field"]}],
    },
    {
        "id": "scouter_name",
        "label": "Scouter Name",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Required field"]}],
    },
    {
        "id": "team_number",
        "label": "Team Number",
        "type": "number",
        "validationType": "number",
        "validations": [
            {"type": "required", "params": ["Required field"]},
            {"type": "integer", "params": ["Must be integer"]},
            {"type": "min", "params": [1, "Must be positive"]},
            {"type": "max", "params": [9999, "Exceeds maximum limit"]},
        ],
    },
]

DEFAULT_PIT_FORM_SCHEMA = [
]

def get_default_pit_form_schema():
    return DEFAULT_PIT_FORM_SCHEMA