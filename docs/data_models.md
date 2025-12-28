# Data Models and Example SQL (Postgres)

## Users
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('client','stylist','admin')),
  avatar_url text,
  phone text,
  preferences jsonb,
  created_at timestamptz DEFAULT now()
);
```

## Salon
```sql
CREATE TABLE salons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES users(id),
  name text NOT NULL,
  location text,
  timezone text,
  settings jsonb,
  created_at timestamptz DEFAULT now()
);
```

## Service
```sql
CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  name text NOT NULL,
  duration_min int NOT NULL,
  base_price numeric(10,2) NOT NULL,
  tags text[]
);
```

## Booking (business rules / constraints)
- No double-booking for same stylist: enforce via exclusion constraint using tstzrange(start_at, end_at).

```sql
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  salon_id uuid REFERENCES salons(id),
  service_id uuid REFERENCES services(id),
  stylist_id uuid REFERENCES users(id),
  start_at timestamptz NOT NULL,
  end_at timestamptz NOT NULL,
  status text CHECK (status IN ('pending','confirmed','cancelled','completed')) DEFAULT 'pending',
  price_total numeric(10,2),
  created_at timestamptz DEFAULT now()
);

-- Add exclusion constraint to prevent overlapping bookings for the same stylist
ALTER TABLE bookings
  ADD EXCLUDE USING gist (stylist_id WITH =, tstzrange(start_at, end_at) WITH &&);
```

## StyleProfile
```sql
CREATE TABLE style_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  photo_url text,
  event_type text,
  attributes jsonb,
  ai_recommendation jsonb,
  score numeric,
  created_at timestamptz DEFAULT now()
);
```

## PricingRule
```sql
CREATE TABLE pricing_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES salons(id),
  rule_type text CHECK (rule_type IN ('dynamic_multiplier','time_surcharge','demand_markup')),
  params jsonb,
  active boolean DEFAULT true
);
```

## AuditLog
```sql
CREATE TABLE audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity text,
  action text,
  payload jsonb,
  created_at timestamptz DEFAULT now()
);
```

# Notes on validation and business rules
- Validate that `end_at = start_at + service.duration_min + buffer_min`.
- Price calculation should be deterministic given `service`, `pricing_rules` and `datetime`.
- For recommendation: store `ai_recommendation` as structured JSON with `styles[]`, `confidence`, and `explain`.
