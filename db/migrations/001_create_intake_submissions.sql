create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique check (reference_id ~ '^[0-9A-F]{8}$'),
  submitted_at timestamptz not null default now(),
  language text not null check (language in ('en', 'es')),
  goal text not null,
  name text not null,
  email text not null,
  phone text,
  contact_preference text not null check (contact_preference in ('email', 'phone', 'whatsapp')),
  preferred_language text not null check (preferred_language in ('english', 'spanish', 'either')),
  consent_to_contact boolean not null check (consent_to_contact),
  intake_data jsonb not null
);

comment on table public.intake_submissions is
  'Validated immigration intake submissions. Contains personal data, application server access only.';

revoke all on table public.intake_submissions from public;

create index if not exists intake_submissions_submitted_at_idx
  on public.intake_submissions (submitted_at desc);

create index if not exists intake_submissions_goal_idx
  on public.intake_submissions (goal);
