create table tbl_accomodationService (
    id serial not null unique,
    explanation text not null,
    learnMore text not null,
    otherService text not null,
    guides text not null,
    active boolean not null,
    primary key (id)
);

create table tbl_liposuction (
    id serial not null unique,
    learnMore text not null,
    explanation text not null,
    active boolean not null,
    primary key (id)
);