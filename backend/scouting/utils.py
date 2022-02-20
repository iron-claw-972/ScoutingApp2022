BASE_MATCH_FORM_SCHEMA = [
    {
        "id": "match_key",
        "label": "Match Key",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Match key is required"]}],
    },
    {
        "id": "scouter_name",
        "label": "Scouter Name",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Scouter name is required"]}],
    },
    {
        "id": "team_number",
        "label": "Team Number",
        "type": "number",
        "validationType": "number",
        "validations": [
            {"type": "required", "params": ["Team number is required"]},
            {"type": "integer", "params": ["Team number must be an integer"]},
            {"type": "min", "params": [1, "Team number must be >= 1"]},
            {"type": "max", "params": [9999, "Team number cannot exceed 9999"]},
        ],
    },
    {
        "id": "driver_station",
        "label": "Driver Station",
        "type": "radio",
        "validationType": "string",
        "options": ["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"],
        "validations": [
            {"type": "required", "params": ["Driver station position is required"]}
        ],
    },
]

BASE_PIT_FORM_SCHEMA = [
    {
        "id": "event_key",
        "label": "Event Key",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Event key is required"]}],
    },
    {
        "id": "scouter_name",
        "label": "Scouter Name",
        "type": "text",
        "validationType": "string",
        "validations": [{"type": "required", "params": ["Scouter name is required"]}],
    },
    {
        "id": "team_number",
        "label": "Team Number",
        "type": "number",
        "validationType": "number",
        "validations": [
            {"type": "required", "params": ["Team number is required"]},
            {"type": "integer", "params": ["Team number must be an integer"]},
            {"type": "min", "params": [1, "Team number must be >= 1"]},
            {"type": "max", "params": [9999, "Team number cannot exceed 9999"]},
        ],
    },
]