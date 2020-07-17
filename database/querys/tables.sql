create table tbl_accomodationService (
    id serial not null unique,
    explanation text not null,
    learnMore text not null,
    otherService text not null,
    guides text not null,
    active boolean not null,
    primary key (id)
);