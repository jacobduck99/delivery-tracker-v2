
PRAGMA foreign_keys = ON;

create table if not exists run (
  id              integer primary key autoincrement,
  user_id         integer not null,
  van_number      integer not null,
  van_name        text    not null,
  start_time      text    not null,
  first_break     text    not null,
  second_break    text    not null,
  end_time        text,
  actual_end_time_at text,
  duration_ms     integer,
  number_of_drops integer not null,
  truck_damage text DEFAULT NULL CHECK (truck_damage IS NULL OR length(truck_damage) <= 255), 
  foreign key(user_id) references users(id) on delete cascade
);
