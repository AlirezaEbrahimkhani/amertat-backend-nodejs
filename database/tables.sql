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

create table tbl_hairTransplant (
    id serial not null unique,
    learnMore text not null,
    explanation text not null,
    active boolean not null,
    primary key (id)
);

create table tbl_images (
    id serial not null,
    image bytea not null,
    img_name varchar(255) not null unique,
    primary key (id)
);

create table tbl_popularDestination (
    id serial not null,
    title varchar(100) not null,
    description text not null,
    writer varchar(100) not null,
    image_id int not null,
    PRIMARY KEY(id),
    FOREIGN KEY (image_id) REFERENCES tbl_images (id)
);

create table tbl_tourismServie (
    id serial not null unique,
    explanation text not null,
    active boolean not null,
    primary key (id)
);

create table tbl_home(
    id serial not null unique,
    introduction text not null,
    about text not null,
    whyIran text not null,
    whyAmertat text not null,
    active boolean not null,
    primary key(id)
);