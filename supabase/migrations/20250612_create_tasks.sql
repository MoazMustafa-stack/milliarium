-- Enable RLS
alter table auth.users enable row level security;

-- Create tasks table
create table tasks (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  status text not null default 'todo',
  due_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) not null
);

-- Create RLS policies
create policy "Users can view their own tasks."
  on tasks for select
  using (auth.uid() = user_id);

create policy "Users can insert their own tasks."
  on tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own tasks."
  on tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete their own tasks."
  on tasks for delete
  using (auth.uid() = user_id);
