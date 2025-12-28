# OpenAI o1-preview Prompts & Examples

## Purpose
Use o1-preview to **audit** business logic and to **generate/explain** style recommendations. The model acts as a probabilistic oracle and should return structured JSON including confidences and suggestions for follow-ups.

---

## Prompt: Style recommendation (user-facing)
```
System: You are an assistant that returns structured style recommendations for a user's photo and event.

User: Given input {photo_features, event_type, user_preferences}, return a JSON with top 3 styles. For each style include: name, short_description, confidence (0..1), suggested_service_id, and a short explanation for the user. Also include any audit_notes if you detect constraints (e.g., "requires long session", "not available at this salon").

Output schema:
{
  "styles": [
    {"name":"","description":"","confidence":0.0,"recommended_service_id":"","explain":""}
  ],
  "audit_notes": ["string"]
}
```

## Prompt: Audit booking logic (internal)
```
System: You are an auditor for booking logic. Given the booking input and salon rules, return a JSON: {valid:boolean, reasons:[...], risk_score:0..1, suggested_mitigation:[...]}. If overlapping detected or high risk of no-show, provide reason and suggested follow-up actions.
```

## Example expected response (recommendation)
```json
{
  "styles": [
    {"name":"Modern Pompadour","description":"Classic cut with volume at top, tapered sides.","confidence":0.92,"recommended_service_id":"srv_123","explain":"Good for formal events and suits face shape."},
    {"name":"Textured Crop","description":"Short textured top with faded sides.","confidence":0.78,"recommended_service_id":"srv_234","explain":"Quick to maintain and cool for casual events."}
  ],
  "audit_notes": ["Selected style may need 60+ minutes — verify stylist availability."]
}
```

## Use in code
- Call /recommend/style; on backend, forward user's input to o1-preview for audit and explanation.
- If `audit_notes` includes availability warnings, surface them to user and require confirmation.
