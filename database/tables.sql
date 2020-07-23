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

create table tbl_popularProcedure (
    id serial not null,
    description text not null,
    link text not null,
    image_id int not null,
    PRIMARY KEY(id),
    FOREIGN KEY (image_id) REFERENCES tbl_images (id)
);

create table tbl_feedback (
    id serial not null,
    feedback_name varchar(50) not null,
    feedback_value int not null,
    primary key(id)
);

create table tbl_method (
    id serial not null,
    method_name varchar(50) not null,
    primary key(id)
);

create table tbl_contactUs (
    id serial not null,
    first_name varchar(50) not null,
    last_name varchar(70) not null,
    phone_number bigint not null,
    subject varchar(30),
    email varchar(50) not null,
    address varchar(255) not null,
    feedback_id int not null,
    primary key (id),
    FOREIGN KEY (feedback_id) REFERENCES tbl_feedback (id)
);

create table tbl_getFreeQoute (
    id serial not null,
    first_name varchar(50) not null,
    last_name varchar(70) not null,
    phone_number bigint not null,
    subject varchar(30),
    address varchar(255) not null,
    message text not null,
    method_id int not null,
    primary key (id),
    FOREIGN KEY (method_id) REFERENCES tbl_method (id)
);

create table tbl_team (
    id serial not null,
    name varchar(100) not null,
    position varchar(30) not null,
    description varchar(255) not null,
    image_id int not null,
    primary key(id),
    foreign key (image_id) references tbl_images (id)
);

create table tbl_developers (
    id serial not null,
    name varchar(100) not null,
    position varchar(30) not null,
    image_id int not null,
    primary key(id),
    foreign key (image_id) references tbl_images (id)
);

create table tbl_blog(
    id serial not null,
    title varchar(255) not null,
    description text not null,
    link text not null,
    image_id int not null,
    PRIMARY key (id),
    foreign key (image_id) references tbl_images (id)
);