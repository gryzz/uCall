--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

--
-- Name: plpgsql; Type: PROCEDURAL LANGUAGE; Schema: -; Owner: postgres
--

CREATE OR REPLACE PROCEDURAL LANGUAGE plpgsql;


ALTER PROCEDURAL LANGUAGE plpgsql OWNER TO postgres;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE auth_group_id_seq OWNED BY auth_group.id;


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auth_group_id_seq', 1, true);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY auth_group_permissions.id;


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_message; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE auth_message (
    id integer NOT NULL,
    user_id integer NOT NULL,
    message text NOT NULL
);


ALTER TABLE public.auth_message OWNER TO postgres;

--
-- Name: auth_message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auth_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_message_id_seq OWNER TO postgres;

--
-- Name: auth_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE auth_message_id_seq OWNED BY auth_message.id;


--
-- Name: auth_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auth_message_id_seq', 1, false);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE auth_permission (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE auth_permission_id_seq OWNED BY auth_permission.id;


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auth_permission_id_seq', 128, true);


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE auth_user (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(75) NOT NULL,
    password character varying(128) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    last_login timestamp with time zone NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE auth_user_groups_id_seq OWNED BY auth_user_groups.id;


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auth_user_groups_id_seq', 2, true);


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE auth_user_id_seq OWNED BY auth_user.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auth_user_id_seq', 8, true);


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE auth_user_user_permissions_id_seq OWNED BY auth_user_user_permissions.id;


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('auth_user_user_permissions_id_seq', 1, false);


--
-- Name: config_config; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE config_config (
    id integer NOT NULL,
    section character varying(255) NOT NULL,
    key character varying(255) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.config_config OWNER TO postgres;

--
-- Name: config_config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE config_config_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.config_config_id_seq OWNER TO postgres;

--
-- Name: config_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE config_config_id_seq OWNED BY config_config.id;


--
-- Name: config_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('config_config_id_seq', 5, true);


--
-- Name: crm_crmadapter; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE crm_crmadapter (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    type_id integer NOT NULL
);


ALTER TABLE public.crm_crmadapter OWNER TO postgres;

--
-- Name: crm_crmadapter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE crm_crmadapter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.crm_crmadapter_id_seq OWNER TO postgres;

--
-- Name: crm_crmadapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE crm_crmadapter_id_seq OWNED BY crm_crmadapter.id;


--
-- Name: crm_crmadapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('crm_crmadapter_id_seq', 1, true);


--
-- Name: crm_crmadapteroption; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE crm_crmadapteroption (
    id integer NOT NULL,
    key character varying(255) NOT NULL,
    value character varying(255) NOT NULL,
    adapter_id integer NOT NULL
);


ALTER TABLE public.crm_crmadapteroption OWNER TO postgres;

--
-- Name: crm_crmadapteroption_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE crm_crmadapteroption_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.crm_crmadapteroption_id_seq OWNER TO postgres;

--
-- Name: crm_crmadapteroption_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE crm_crmadapteroption_id_seq OWNED BY crm_crmadapteroption.id;


--
-- Name: crm_crmadapteroption_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('crm_crmadapteroption_id_seq', 4, true);


--
-- Name: crm_crmadaptertype; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE crm_crmadaptertype (
    id integer NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.crm_crmadaptertype OWNER TO postgres;

--
-- Name: crm_crmadaptertype_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE crm_crmadaptertype_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.crm_crmadaptertype_id_seq OWNER TO postgres;

--
-- Name: crm_crmadaptertype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE crm_crmadaptertype_id_seq OWNED BY crm_crmadaptertype.id;


--
-- Name: crm_crmadaptertype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('crm_crmadaptertype_id_seq', 2, true);


--
-- Name: crm_crmcustomer; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE crm_crmcustomer (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    phone_number_id integer NOT NULL
);


ALTER TABLE public.crm_crmcustomer OWNER TO postgres;

--
-- Name: crm_crmcustomer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE crm_crmcustomer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.crm_crmcustomer_id_seq OWNER TO postgres;

--
-- Name: crm_crmcustomer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE crm_crmcustomer_id_seq OWNED BY crm_crmcustomer.id;


--
-- Name: crm_crmcustomer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('crm_crmcustomer_id_seq', 2, true);


--
-- Name: crm_crmcustomernumber; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE crm_crmcustomernumber (
    id integer NOT NULL,
    phone_number character varying(255) NOT NULL,
    dialog_form_id integer NOT NULL,
    crm_adapter_id integer NOT NULL
);


ALTER TABLE public.crm_crmcustomernumber OWNER TO postgres;

--
-- Name: crm_crmcustomernumber_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE crm_crmcustomernumber_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.crm_crmcustomernumber_id_seq OWNER TO postgres;

--
-- Name: crm_crmcustomernumber_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE crm_crmcustomernumber_id_seq OWNED BY crm_crmcustomernumber.id;


--
-- Name: crm_crmcustomernumber_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('crm_crmcustomernumber_id_seq', 2, true);


--
-- Name: crm_crmdialogform; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE crm_crmdialogform (
    id integer NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.crm_crmdialogform OWNER TO postgres;

--
-- Name: crm_crmdialogform_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE crm_crmdialogform_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.crm_crmdialogform_id_seq OWNER TO postgres;

--
-- Name: crm_crmdialogform_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE crm_crmdialogform_id_seq OWNED BY crm_crmdialogform.id;


--
-- Name: crm_crmdialogform_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('crm_crmdialogform_id_seq', 1, true);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    content_type_id integer,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE django_admin_log_id_seq OWNED BY django_admin_log.id;


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('django_admin_log_id_seq', 26, true);


--
-- Name: django_comment_flags; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE django_comment_flags (
    id integer NOT NULL,
    user_id integer NOT NULL,
    comment_id integer NOT NULL,
    flag character varying(30) NOT NULL,
    flag_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_comment_flags OWNER TO postgres;

--
-- Name: django_comment_flags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE django_comment_flags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_comment_flags_id_seq OWNER TO postgres;

--
-- Name: django_comment_flags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE django_comment_flags_id_seq OWNED BY django_comment_flags.id;


--
-- Name: django_comment_flags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('django_comment_flags_id_seq', 1, false);


--
-- Name: django_comments; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE django_comments (
    id integer NOT NULL,
    content_type_id integer NOT NULL,
    object_pk text NOT NULL,
    site_id integer NOT NULL,
    user_id integer,
    user_name character varying(50) NOT NULL,
    user_email character varying(75) NOT NULL,
    user_url character varying(200) NOT NULL,
    comment text NOT NULL,
    submit_date timestamp with time zone NOT NULL,
    ip_address inet,
    is_public boolean NOT NULL,
    is_removed boolean NOT NULL
);


ALTER TABLE public.django_comments OWNER TO postgres;

--
-- Name: django_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE django_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_comments_id_seq OWNER TO postgres;

--
-- Name: django_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE django_comments_id_seq OWNED BY django_comments.id;


--
-- Name: django_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('django_comments_id_seq', 1, false);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE django_content_type (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE django_content_type_id_seq OWNED BY django_content_type.id;


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('django_content_type_id_seq', 42, true);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: django_site; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO postgres;

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE django_site_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO postgres;

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE django_site_id_seq OWNED BY django_site.id;


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('django_site_id_seq', 1, true);


--
-- Name: formunculous_application; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_application (
    id integer NOT NULL,
    parent_id integer,
    user_id integer,
    submission_date timestamp with time zone,
    app_definition_id integer NOT NULL
);


ALTER TABLE public.formunculous_application OWNER TO postgres;

--
-- Name: formunculous_application_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_application_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_application_id_seq OWNER TO postgres;

--
-- Name: formunculous_application_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_application_id_seq OWNED BY formunculous_application.id;


--
-- Name: formunculous_application_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_application_id_seq', 12, true);


--
-- Name: formunculous_applicationdefinition; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_applicationdefinition (
    id integer NOT NULL,
    parent_id integer,
    name character varying(150) NOT NULL,
    owner character varying(75) NOT NULL,
    notify_owner boolean NOT NULL,
    slug character varying(50) NOT NULL,
    description text NOT NULL,
    start_date timestamp with time zone NOT NULL,
    stop_date timestamp with time zone NOT NULL,
    authentication boolean NOT NULL,
    authentication_multi_submit boolean NOT NULL,
    notify_reviewers boolean NOT NULL,
    email_only boolean NOT NULL
);


ALTER TABLE public.formunculous_applicationdefinition OWNER TO postgres;

--
-- Name: formunculous_applicationdefinition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_applicationdefinition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_applicationdefinition_id_seq OWNER TO postgres;

--
-- Name: formunculous_applicationdefinition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_applicationdefinition_id_seq OWNED BY formunculous_applicationdefinition.id;


--
-- Name: formunculous_applicationdefinition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_applicationdefinition_id_seq', 3, true);


--
-- Name: formunculous_applicationdefinition_reviewers; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_applicationdefinition_reviewers (
    id integer NOT NULL,
    applicationdefinition_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.formunculous_applicationdefinition_reviewers OWNER TO postgres;

--
-- Name: formunculous_applicationdefinition_reviewers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_applicationdefinition_reviewers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_applicationdefinition_reviewers_id_seq OWNER TO postgres;

--
-- Name: formunculous_applicationdefinition_reviewers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_applicationdefinition_reviewers_id_seq OWNED BY formunculous_applicationdefinition_reviewers.id;


--
-- Name: formunculous_applicationdefinition_reviewers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_applicationdefinition_reviewers_id_seq', 42, true);


--
-- Name: formunculous_applicationdefinition_sites; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_applicationdefinition_sites (
    id integer NOT NULL,
    applicationdefinition_id integer NOT NULL,
    site_id integer NOT NULL
);


ALTER TABLE public.formunculous_applicationdefinition_sites OWNER TO postgres;

--
-- Name: formunculous_applicationdefinition_sites_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_applicationdefinition_sites_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_applicationdefinition_sites_id_seq OWNER TO postgres;

--
-- Name: formunculous_applicationdefinition_sites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_applicationdefinition_sites_id_seq OWNED BY formunculous_applicationdefinition_sites.id;


--
-- Name: formunculous_applicationdefinition_sites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_applicationdefinition_sites_id_seq', 7, true);


--
-- Name: formunculous_basefield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_basefield (
    id integer NOT NULL,
    field_def_id integer NOT NULL,
    app_id integer NOT NULL
);


ALTER TABLE public.formunculous_basefield OWNER TO postgres;

--
-- Name: formunculous_basefield_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_basefield_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_basefield_id_seq OWNER TO postgres;

--
-- Name: formunculous_basefield_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_basefield_id_seq OWNED BY formunculous_basefield.id;


--
-- Name: formunculous_basefield_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_basefield_id_seq', 15, true);


--
-- Name: formunculous_booleanfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_booleanfield (
    basefield_ptr_id integer NOT NULL,
    value boolean NOT NULL
);


ALTER TABLE public.formunculous_booleanfield OWNER TO postgres;

--
-- Name: formunculous_datefield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_datefield (
    basefield_ptr_id integer NOT NULL,
    value date
);


ALTER TABLE public.formunculous_datefield OWNER TO postgres;

--
-- Name: formunculous_documentfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_documentfield (
    basefield_ptr_id integer NOT NULL,
    value character varying(100)
);


ALTER TABLE public.formunculous_documentfield OWNER TO postgres;

--
-- Name: formunculous_dropdownchoices; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_dropdownchoices (
    id integer NOT NULL,
    field_definition_id integer NOT NULL,
    text character varying(255) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.formunculous_dropdownchoices OWNER TO postgres;

--
-- Name: formunculous_dropdownchoices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_dropdownchoices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_dropdownchoices_id_seq OWNER TO postgres;

--
-- Name: formunculous_dropdownchoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_dropdownchoices_id_seq OWNED BY formunculous_dropdownchoices.id;


--
-- Name: formunculous_dropdownchoices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_dropdownchoices_id_seq', 1, false);


--
-- Name: formunculous_emailfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_emailfield (
    basefield_ptr_id integer NOT NULL,
    value character varying(75)
);


ALTER TABLE public.formunculous_emailfield OWNER TO postgres;

--
-- Name: formunculous_fielddefinition; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_fielddefinition (
    id integer NOT NULL,
    type character varying(250) NOT NULL,
    application_id integer NOT NULL,
    pre_text text NOT NULL,
    post_text text NOT NULL,
    page integer NOT NULL,
    "order" integer NOT NULL,
    "group" boolean NOT NULL,
    label character varying(250) NOT NULL,
    slug character varying(50) NOT NULL,
    help_text text NOT NULL,
    require boolean NOT NULL,
    reviewer_only boolean NOT NULL,
    header boolean NOT NULL,
    multi_select boolean NOT NULL,
    use_radio boolean NOT NULL
);


ALTER TABLE public.formunculous_fielddefinition OWNER TO postgres;

--
-- Name: formunculous_fielddefinition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_fielddefinition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_fielddefinition_id_seq OWNER TO postgres;

--
-- Name: formunculous_fielddefinition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_fielddefinition_id_seq OWNED BY formunculous_fielddefinition.id;


--
-- Name: formunculous_fielddefinition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_fielddefinition_id_seq', 4, true);


--
-- Name: formunculous_filefield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_filefield (
    basefield_ptr_id integer NOT NULL,
    value character varying(100)
);


ALTER TABLE public.formunculous_filefield OWNER TO postgres;

--
-- Name: formunculous_floatfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_floatfield (
    basefield_ptr_id integer NOT NULL,
    value double precision
);


ALTER TABLE public.formunculous_floatfield OWNER TO postgres;

--
-- Name: formunculous_form; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_form (
    id integer NOT NULL
);


ALTER TABLE public.formunculous_form OWNER TO postgres;

--
-- Name: formunculous_form_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_form_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_form_id_seq OWNER TO postgres;

--
-- Name: formunculous_form_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_form_id_seq OWNED BY formunculous_form.id;


--
-- Name: formunculous_form_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_form_id_seq', 1, false);


--
-- Name: formunculous_imagefield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_imagefield (
    basefield_ptr_id integer NOT NULL,
    value character varying(100)
);


ALTER TABLE public.formunculous_imagefield OWNER TO postgres;

--
-- Name: formunculous_integerfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_integerfield (
    basefield_ptr_id integer NOT NULL,
    value integer
);


ALTER TABLE public.formunculous_integerfield OWNER TO postgres;

--
-- Name: formunculous_ipaddressfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_ipaddressfield (
    basefield_ptr_id integer NOT NULL,
    value inet
);


ALTER TABLE public.formunculous_ipaddressfield OWNER TO postgres;

--
-- Name: formunculous_positiveintegerfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_positiveintegerfield (
    basefield_ptr_id integer NOT NULL,
    value integer,
    CONSTRAINT formunculous_positiveintegerfield_value_check CHECK ((value >= 0))
);


ALTER TABLE public.formunculous_positiveintegerfield OWNER TO postgres;

--
-- Name: formunculous_subapplicationdefinition; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_subapplicationdefinition (
    id integer NOT NULL,
    app_definition_id integer NOT NULL,
    min_entries integer NOT NULL,
    max_entries integer NOT NULL,
    extras integer NOT NULL
);


ALTER TABLE public.formunculous_subapplicationdefinition OWNER TO postgres;

--
-- Name: formunculous_subapplicationdefinition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE formunculous_subapplicationdefinition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formunculous_subapplicationdefinition_id_seq OWNER TO postgres;

--
-- Name: formunculous_subapplicationdefinition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE formunculous_subapplicationdefinition_id_seq OWNED BY formunculous_subapplicationdefinition.id;


--
-- Name: formunculous_subapplicationdefinition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('formunculous_subapplicationdefinition_id_seq', 1, false);


--
-- Name: formunculous_textarea; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_textarea (
    basefield_ptr_id integer NOT NULL,
    value text
);


ALTER TABLE public.formunculous_textarea OWNER TO postgres;

--
-- Name: formunculous_textfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_textfield (
    basefield_ptr_id integer NOT NULL,
    value character varying(255)
);


ALTER TABLE public.formunculous_textfield OWNER TO postgres;

--
-- Name: formunculous_urlfield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_urlfield (
    basefield_ptr_id integer NOT NULL,
    value character varying(200)
);


ALTER TABLE public.formunculous_urlfield OWNER TO postgres;

--
-- Name: formunculous_usphonenumber; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_usphonenumber (
    basefield_ptr_id integer NOT NULL,
    value character varying(20)
);


ALTER TABLE public.formunculous_usphonenumber OWNER TO postgres;

--
-- Name: formunculous_usstatefield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_usstatefield (
    basefield_ptr_id integer NOT NULL,
    value character varying(255)
);


ALTER TABLE public.formunculous_usstatefield OWNER TO postgres;

--
-- Name: formunculous_uszipcodefield; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE formunculous_uszipcodefield (
    basefield_ptr_id integer NOT NULL,
    value character varying(10)
);


ALTER TABLE public.formunculous_uszipcodefield OWNER TO postgres;

--
-- Name: ucall_userprofile; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE ucall_userprofile (
    id integer NOT NULL,
    user_id integer NOT NULL,
    "agentKey" character varying(255) NOT NULL
);


ALTER TABLE public.ucall_userprofile OWNER TO postgres;

--
-- Name: ucall_userprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ucall_userprofile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ucall_userprofile_id_seq OWNER TO postgres;

--
-- Name: ucall_userprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ucall_userprofile_id_seq OWNED BY ucall_userprofile.id;


--
-- Name: ucall_userprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('ucall_userprofile_id_seq', 2, true);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE auth_group ALTER COLUMN id SET DEFAULT nextval('auth_group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('auth_group_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE auth_message ALTER COLUMN id SET DEFAULT nextval('auth_message_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE auth_permission ALTER COLUMN id SET DEFAULT nextval('auth_permission_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE auth_user ALTER COLUMN id SET DEFAULT nextval('auth_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE auth_user_groups ALTER COLUMN id SET DEFAULT nextval('auth_user_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE config_config ALTER COLUMN id SET DEFAULT nextval('config_config_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE crm_crmadapter ALTER COLUMN id SET DEFAULT nextval('crm_crmadapter_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE crm_crmadapteroption ALTER COLUMN id SET DEFAULT nextval('crm_crmadapteroption_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE crm_crmadaptertype ALTER COLUMN id SET DEFAULT nextval('crm_crmadaptertype_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE crm_crmcustomer ALTER COLUMN id SET DEFAULT nextval('crm_crmcustomer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE crm_crmcustomernumber ALTER COLUMN id SET DEFAULT nextval('crm_crmcustomernumber_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE crm_crmdialogform ALTER COLUMN id SET DEFAULT nextval('crm_crmdialogform_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE django_admin_log ALTER COLUMN id SET DEFAULT nextval('django_admin_log_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE django_comment_flags ALTER COLUMN id SET DEFAULT nextval('django_comment_flags_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE django_comments ALTER COLUMN id SET DEFAULT nextval('django_comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE django_content_type ALTER COLUMN id SET DEFAULT nextval('django_content_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE django_site ALTER COLUMN id SET DEFAULT nextval('django_site_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_application ALTER COLUMN id SET DEFAULT nextval('formunculous_application_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_applicationdefinition ALTER COLUMN id SET DEFAULT nextval('formunculous_applicationdefinition_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_applicationdefinition_reviewers ALTER COLUMN id SET DEFAULT nextval('formunculous_applicationdefinition_reviewers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_applicationdefinition_sites ALTER COLUMN id SET DEFAULT nextval('formunculous_applicationdefinition_sites_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_basefield ALTER COLUMN id SET DEFAULT nextval('formunculous_basefield_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_dropdownchoices ALTER COLUMN id SET DEFAULT nextval('formunculous_dropdownchoices_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_fielddefinition ALTER COLUMN id SET DEFAULT nextval('formunculous_fielddefinition_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_form ALTER COLUMN id SET DEFAULT nextval('formunculous_form_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE formunculous_subapplicationdefinition ALTER COLUMN id SET DEFAULT nextval('formunculous_subapplicationdefinition_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ucall_userprofile ALTER COLUMN id SET DEFAULT nextval('ucall_userprofile_id_seq'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY auth_group (id, name) FROM stdin;
1	operators
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY auth_message (id, user_id, message) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY auth_permission (id, name, content_type_id, codename) FROM stdin;
25	Can add log entry	9	add_logentry
26	Can change log entry	9	change_logentry
27	Can delete log entry	9	delete_logentry
4	Can add group	2	add_group
5	Can change group	2	change_group
6	Can delete group	2	delete_group
10	Can add message	4	add_message
11	Can change message	4	change_message
12	Can delete message	4	delete_message
1	Can add permission	1	add_permission
2	Can change permission	1	change_permission
3	Can delete permission	1	delete_permission
7	Can add user	3	add_user
8	Can change user	3	change_user
9	Can delete user	3	delete_user
22	Can add config	8	add_config
23	Can change config	8	change_config
24	Can delete config	8	delete_config
13	Can add content type	5	add_contenttype
14	Can change content type	5	change_contenttype
15	Can delete content type	5	delete_contenttype
16	Can add session	6	add_session
17	Can change session	6	change_session
18	Can delete session	6	delete_session
19	Can add site	7	add_site
20	Can change site	7	change_site
21	Can delete site	7	delete_site
31	Can add user profile	11	add_userprofile
32	Can change user profile	11	change_userprofile
33	Can delete user profile	11	delete_userprofile
37	Can add crm customer number	13	add_crmcustomernumber
38	Can change crm customer number	13	change_crmcustomernumber
39	Can delete crm customer number	13	delete_crmcustomernumber
40	Can add crm customer	14	add_crmcustomer
41	Can change crm customer	14	change_crmcustomer
42	Can delete crm customer	14	delete_crmcustomer
43	Can add application definition	15	add_applicationdefinition
44	Can change application definition	15	change_applicationdefinition
45	Can delete application definition	15	delete_applicationdefinition
46	Can add sub application definition	16	add_subapplicationdefinition
47	Can change sub application definition	16	change_subapplicationdefinition
48	Can delete sub application definition	16	delete_subapplicationdefinition
49	Can add field definition	17	add_fielddefinition
50	Can change field definition	17	change_fielddefinition
51	Can delete field definition	17	delete_fielddefinition
52	Can add drop down choices	18	add_dropdownchoices
53	Can change drop down choices	18	change_dropdownchoices
54	Can delete drop down choices	18	delete_dropdownchoices
55	Can add application	19	add_application
56	Can change application	19	change_application
57	Can delete application	19	delete_application
58	Can add form	20	add_form
59	Can change form	20	change_form
60	Can delete form	20	delete_form
61	Can delete applications	20	can_delete_applications
62	Can add base field	21	add_basefield
63	Can change base field	21	change_basefield
64	Can delete base field	21	delete_basefield
65	Can add text field	22	add_textfield
66	Can change text field	22	change_textfield
67	Can delete text field	22	delete_textfield
68	Can add text area	23	add_textarea
69	Can change text area	23	change_textarea
70	Can delete text area	23	delete_textarea
71	Can add boolean field	24	add_booleanfield
72	Can change boolean field	24	change_booleanfield
73	Can delete boolean field	24	delete_booleanfield
74	Can add email field	25	add_emailfield
75	Can change email field	25	change_emailfield
76	Can delete email field	25	delete_emailfield
77	Can add us phone number	26	add_usphonenumber
78	Can change us phone number	26	change_usphonenumber
79	Can delete us phone number	26	delete_usphonenumber
80	Can add us state field	27	add_usstatefield
81	Can change us state field	27	change_usstatefield
82	Can delete us state field	27	delete_usstatefield
83	Can add us zip code field	28	add_uszipcodefield
84	Can change us zip code field	28	change_uszipcodefield
85	Can delete us zip code field	28	delete_uszipcodefield
86	Can add date field	29	add_datefield
87	Can change date field	29	change_datefield
88	Can delete date field	29	delete_datefield
89	Can add float field	30	add_floatfield
90	Can change float field	30	change_floatfield
91	Can delete float field	30	delete_floatfield
92	Can add integer field	31	add_integerfield
93	Can change integer field	31	change_integerfield
94	Can delete integer field	31	delete_integerfield
95	Can add positive integer field	32	add_positiveintegerfield
96	Can change positive integer field	32	change_positiveintegerfield
97	Can delete positive integer field	32	delete_positiveintegerfield
98	Can add url field	33	add_urlfield
99	Can change url field	33	change_urlfield
100	Can delete url field	33	delete_urlfield
101	Can add ip address field	34	add_ipaddressfield
102	Can change ip address field	34	change_ipaddressfield
103	Can delete ip address field	34	delete_ipaddressfield
104	Can add file field	35	add_filefield
105	Can change file field	35	change_filefield
106	Can delete file field	35	delete_filefield
107	Can add image field	36	add_imagefield
108	Can change image field	36	change_imagefield
109	Can delete image field	36	delete_imagefield
110	Can add document field	37	add_documentfield
111	Can change document field	37	change_documentfield
112	Can delete document field	37	delete_documentfield
113	Can add comment	38	add_comment
114	Can change comment	38	change_comment
115	Can delete comment	38	delete_comment
116	Can moderate comments	38	can_moderate
117	Can add comment flag	39	add_commentflag
118	Can change comment flag	39	change_commentflag
119	Can delete comment flag	39	delete_commentflag
120	Can add crm adapter type	40	add_crmadaptertype
121	Can change crm adapter type	40	change_crmadaptertype
122	Can delete crm adapter type	40	delete_crmadaptertype
123	Can add crm adapter	41	add_crmadapter
124	Can change crm adapter	41	change_crmadapter
125	Can delete crm adapter	41	delete_crmadapter
126	Can add crm adapter option	42	add_crmadapteroption
127	Can change crm adapter option	42	change_crmadapteroption
128	Can delete crm adapter option	42	delete_crmadapteroption
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY auth_user (id, username, first_name, last_name, email, password, is_staff, is_active, is_superuser, last_login, date_joined) FROM stdin;
4	fake	Just	User	fake@google.com	sha1$d18ff$e76880bc5d8b30f359184f194dd9c8d6cacdd76b	f	t	f	2011-06-17 15:05:29+03	2011-06-17 15:05:29+03
5	rrrr				sha1$265df$d3b2d71baf32e55858e879ad4959f6ca10b1cdb2	f	t	f	2011-06-19 17:34:34+03	2011-06-19 17:34:34+03
8	ggg				sha1$10a64$ed611034640c71a1d8295e73a0a6d736ece3daa5	f	t	f	2011-06-19 18:02:34.835526+03	2011-06-19 18:02:34.835551+03
2	test	Andrew	Kornilov	test@test.org	sha1$4a81a$3b4e2e14576cc1c45de52a602cd0411511971c24	f	t	f	2011-06-16 12:20:40+03	2011-06-07 14:51:08+03
3	test2	Test2	Test2		sha1$c29bb$496d0ef60414297f2ea0a99cd213ae108d6250e0	f	t	f	2011-06-08 02:36:36+03	2011-06-08 02:36:36+03
1	frutik	Andrew	Kornilov	frutik@gmail.com	sha1$a6edb$79d7f3726c121156fd0ba1ca548e166d289565bb	t	t	t	2011-06-27 23:29:32.330564+03	2011-06-03 19:19:58+03
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY auth_user_groups (id, user_id, group_id) FROM stdin;
1	2	1
2	3	1
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: config_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY config_config (id, section, key, value) FROM stdin;
3	stomp	username	guest
4	stomp	password	password
5	stomp	stomp_url	ucall.org
1	stomp	ws_url	ws://172.22.90.132:61614/stomp
\.


--
-- Data for Name: crm_crmadapter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY crm_crmadapter (id, title, type_id) FROM stdin;
1	VTiger Instance	1
\.


--
-- Data for Name: crm_crmadapteroption; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY crm_crmadapteroption (id, key, value, adapter_id) FROM stdin;
3	db_user	root	1
4	db_password	qweasd	1
2	db_name	vtigercrm521	1
1	db_host	localhost	1
\.


--
-- Data for Name: crm_crmadaptertype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY crm_crmadaptertype (id, title) FROM stdin;
1	VTiger
2	Django CRM
\.


--
-- Data for Name: crm_crmcustomer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY crm_crmcustomer (id, title, phone_number_id) FROM stdin;
1	ambulance	1
2	Internet Provider	2
\.


--
-- Data for Name: crm_crmcustomernumber; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY crm_crmcustomernumber (id, phone_number, dialog_form_id, crm_adapter_id) FROM stdin;
1	430913	1	1
2	205	1	1
\.


--
-- Data for Name: crm_crmdialogform; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY crm_crmdialogform (id, title) FROM stdin;
1	Test Dialog Form
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY django_admin_log (id, action_time, user_id, content_type_id, object_id, object_repr, action_flag, change_message) FROM stdin;
14	2011-06-19 17:59:24.184425+03	1	3	6	www	3	
15	2011-06-19 18:02:06.944409+03	1	3	7	yyyy	1	
16	2011-06-19 18:02:25.661229+03	1	3	7	yyyy	3	
17	2011-06-19 18:02:34.854635+03	1	3	8	ggg	1	
13	2011-06-16 15:11:58+03	1	8	1	Config object	1	
12	2011-06-08 15:22:14+03	1	3	2	test	2	No fields changed.
11	2011-06-08 12:21:57+03	1	3	2	test	2	Added user profile "UserProfile object".
10	2011-06-08 04:32:26+03	1	3	1	frutik	2	Changed first_name and last_name. Added user profile "UserProfile object".
9	2011-06-08 03:02:32+03	1	3	1	frutik	2	Changed agentKey for user profile "UserProfile object".
8	2011-06-08 03:01:30+03	1	3	2	test	2	Added user profile "UserProfile object".
7	2011-06-08 02:49:17+03	1	3	1	frutik	2	Added user profile "UserProfile object".
6	2011-06-08 02:37:29+03	1	3	3	test2	2	Changed first_name, last_name and groups.
5	2011-06-08 02:36:36+03	1	3	3	test2	1	
4	2011-06-07 14:51:58+03	1	3	2	test	2	Changed first_name, last_name and email.
3	2011-06-07 14:51:27+03	1	3	2	test	2	Changed groups.
2	2011-06-07 14:51:08+03	1	3	2	test	1	
1	2011-06-07 14:50:30+03	1	2	1	operators	1	
18	2011-06-21 18:37:29.567809+03	1	8	1	ws_url	2	Changed value.
19	2011-06-22 18:15:02.781157+03	1	8	1	ws_url	2	Changed value.
20	2011-06-27 12:55:10.386131+03	1	8	1	ws_url	2	Changed value.
21	2011-06-27 12:56:02.513602+03	1	8	1	ws_url	2	Changed value.
22	2011-06-27 19:23:36.514235+03	1	3	1	frutik	2	Changed agentKey for user profile "UserProfile object".
23	2011-06-27 23:30:34.537119+03	1	8	1	ws_url	2	Changed value.
24	2011-06-28 13:06:08.192362+03	1	13	2	205	1	
25	2011-06-28 13:06:48.763828+03	1	14	2	Internet Provider	1	
26	2011-06-29 15:32:28.365143+03	1	8	1	ws_url	2	Changed value.
\.


--
-- Data for Name: django_comment_flags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY django_comment_flags (id, user_id, comment_id, flag, flag_date) FROM stdin;
\.


--
-- Data for Name: django_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY django_comments (id, content_type_id, object_pk, site_id, user_id, user_name, user_email, user_url, comment, submit_date, ip_address, is_public, is_removed) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY django_content_type (id, name, app_label, model) FROM stdin;
8	config	config	config
5	content type	contenttypes	contenttype
2	group	auth	group
9	log entry	admin	logentry
4	message	auth	message
1	permission	auth	permission
6	session	sessions	session
7	site	sites	site
3	user	auth	user
11	user profile	ucall	userprofile
13	crm customer number	crm	crmcustomernumber
14	crm customer	crm	crmcustomer
15	application definition	formunculous	applicationdefinition
16	sub application definition	formunculous	subapplicationdefinition
17	field definition	formunculous	fielddefinition
18	drop down choices	formunculous	dropdownchoices
19	application	formunculous	application
20	form	formunculous	form
21	base field	formunculous	basefield
22	text field	formunculous	textfield
23	text area	formunculous	textarea
24	boolean field	formunculous	booleanfield
25	email field	formunculous	emailfield
26	us phone number	formunculous	usphonenumber
27	us state field	formunculous	usstatefield
28	us zip code field	formunculous	uszipcodefield
29	date field	formunculous	datefield
30	float field	formunculous	floatfield
31	integer field	formunculous	integerfield
32	positive integer field	formunculous	positiveintegerfield
33	url field	formunculous	urlfield
34	ip address field	formunculous	ipaddressfield
35	file field	formunculous	filefield
36	image field	formunculous	imagefield
37	document field	formunculous	documentfield
38	comment	comments	comment
39	comment flag	comments	commentflag
40	crm adapter type	crm	crmadaptertype
41	crm adapter	crm	crmadapter
42	crm adapter option	crm	crmadapteroption
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY django_session (session_key, session_data, expire_date) FROM stdin;
fd8f261da768b3948d022b735adde118	MDhmNDg4NTFjYmMwY2FmNWM5ZjJhNTMxNThjMjE4NmE2NmRmZmI3YTqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQRLAXUu\n	2011-06-30 14:41:37+03
96ee5b46ac807a738a0372aea6ccaa4c	OTQ5MzNiNTZiYjEzMmE1NzUxYjhiNDA4MWQ1NzIwMGM4NWQ2ZGE2ZDqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQRLAnUu\n	2011-06-24 18:28:00+03
e958d0ebfab15ca777d2b274296e7fe8	MDhmNDg4NTFjYmMwY2FmNWM5ZjJhNTMxNThjMjE4NmE2NmRmZmI3YTqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQRLAXUu\n	2011-06-17 19:33:25.424049+03
f39f09111e39b99f5fb9817e772dd227	MDhmNDg4NTFjYmMwY2FmNWM5ZjJhNTMxNThjMjE4NmE2NmRmZmI3YTqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQRLAXUu\n	2011-07-05 18:36:29.133986+03
06a083d0f33d49984a704d421761233c	MTNjNmZiOWQ3M2Y0NGVkM2RlOTk0YjhlM2QxZjJkNjQ4NDFkYzgzYzqAAn1xAVUKdGVzdGNvb2tp\nZVUGd29ya2VkcQJzLg==\n	2011-07-11 19:22:25.19955+03
e533118ef7e4e4c6c6566701abc1baa1	MDhmNDg4NTFjYmMwY2FmNWM5ZjJhNTMxNThjMjE4NmE2NmRmZmI3YTqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQRLAXUu\n	2011-07-11 23:29:32.949039+03
464d00774d3f0d899a9d7d4171943998	MDhmNDg4NTFjYmMwY2FmNWM5ZjJhNTMxNThjMjE4NmE2NmRmZmI3YTqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQRLAXUu\n	2011-06-23 18:58:14.390543+03
d8947cf740fcde9a0de061ba70a54cb4	NmNkNGYxY2IwZTA5ZmRmZDE0MTYwZDA1ZTkzYzFjZDNkYjk0ZjY0ZDqAAn1xAVUKdGVzdGNvb2tp\nZXECVQZ3b3JrZWRxA3Mu\n	2011-06-23 20:17:01.881395+03
c9293b3f8378f083e620b56f7165532a	NWVjNGVhODRjYmQ0ZTdhNmYxYmY3NmY3ZmVkNDAzMmU5NWMxMmRmMjqAAn1xAShVCnRlc3Rjb29r\naWVxAlUGd29ya2VkcQNVDV9hdXRoX3VzZXJfaWRLAVUSX2F1dGhfdXNlcl9iYWNrZW5kVSlkamFu\nZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHUu\n	2011-06-29 06:28:30.444187+03
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY django_site (id, domain, name) FROM stdin;
1	example.com	example.com
\.


--
-- Data for Name: formunculous_application; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_application (id, parent_id, user_id, submission_date, app_definition_id) FROM stdin;
1	\N	\N	2011-06-22 19:55:19.993303+03	1
2	\N	\N	2011-06-22 20:54:39.093364+03	1
3	\N	\N	2011-06-22 20:56:05.762393+03	1
4	\N	\N	2011-06-22 20:56:23.912236+03	1
5	\N	\N	2011-06-22 20:57:27.881681+03	1
6	\N	\N	2011-06-22 21:04:35.971189+03	3
7	\N	\N	2011-06-22 21:05:37.848999+03	3
8	\N	\N	2011-06-22 21:05:48.590388+03	3
9	\N	1	\N	1
10	\N	1	\N	1
11	\N	1	\N	1
12	\N	1	\N	1
\.


--
-- Data for Name: formunculous_applicationdefinition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_applicationdefinition (id, parent_id, name, owner, notify_owner, slug, description, start_date, stop_date, authentication, authentication_multi_submit, notify_reviewers, email_only) FROM stdin;
1	\N	first form	gryzzbox@gmail.com	f	first-form	My first test form	2011-06-22 08:00:00+03	2012-02-23 08:00:00+02	f	f	f	f
3	\N	submit test	gryzzbox@gmail.com	f	submit-test		2011-06-22 08:00:00+03	2012-02-23 08:00:00+02	f	f	f	f
\.


--
-- Data for Name: formunculous_applicationdefinition_reviewers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_applicationdefinition_reviewers (id, applicationdefinition_id, user_id) FROM stdin;
7	1	1
8	1	2
9	1	3
10	1	4
11	1	5
12	1	8
37	3	1
38	3	2
39	3	3
40	3	4
41	3	5
42	3	8
\.


--
-- Data for Name: formunculous_applicationdefinition_sites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_applicationdefinition_sites (id, applicationdefinition_id, site_id) FROM stdin;
2	1	1
7	3	1
\.


--
-- Data for Name: formunculous_basefield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_basefield (id, field_def_id, app_id) FROM stdin;
1	1	1
2	2	1
3	1	2
4	2	2
5	1	3
6	2	3
7	1	4
8	2	4
9	1	5
10	2	5
11	3	6
12	3	7
13	3	8
14	1	12
15	2	12
\.


--
-- Data for Name: formunculous_booleanfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_booleanfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_datefield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_datefield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_documentfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_documentfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_dropdownchoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_dropdownchoices (id, field_definition_id, text, value) FROM stdin;
\.


--
-- Data for Name: formunculous_emailfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_emailfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_fielddefinition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_fielddefinition (id, type, application_id, pre_text, post_text, page, "order", "group", label, slug, help_text, require, reviewer_only, header, multi_select, use_radio) FROM stdin;
1	TextField	1			1	0	f	Email	email		t	f	t	f	f
2	TextArea	1			1	3	f	Summarize call	summarize-call		t	f	t	f	f
3	TextField	3			1	0	f	text	text		t	f	t	f	f
4	TextField	1			1	6	f	new filed	new-filed		t	f	t	f	f
\.


--
-- Data for Name: formunculous_filefield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_filefield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_floatfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_floatfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_form; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_form (id) FROM stdin;
\.


--
-- Data for Name: formunculous_imagefield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_imagefield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_integerfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_integerfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_ipaddressfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_ipaddressfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_positiveintegerfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_positiveintegerfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_subapplicationdefinition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_subapplicationdefinition (id, app_definition_id, min_entries, max_entries, extras) FROM stdin;
\.


--
-- Data for Name: formunculous_textarea; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_textarea (basefield_ptr_id, value) FROM stdin;
2	fewfwef
4	рапр
6	sdfsdf
8	fff
10	eee
15	eee
\.


--
-- Data for Name: formunculous_textfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_textfield (basefield_ptr_id, value) FROM stdin;
1	gryzz@mail.lviv.ua
3	прапр
5	sdfsd
7	ff
9	eee
11	www
12	sss
13	eeee
14	www
\.


--
-- Data for Name: formunculous_urlfield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_urlfield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_usphonenumber; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_usphonenumber (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_usstatefield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_usstatefield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: formunculous_uszipcodefield; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY formunculous_uszipcodefield (basefield_ptr_id, value) FROM stdin;
\.


--
-- Data for Name: ucall_userprofile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ucall_userprofile (id, user_id, "agentKey") FROM stdin;
2	2	SIP/1113
1	1	SIP/1001
\.


--
-- Name: auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions_group_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_key UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_message
    ADD CONSTRAINT auth_message_pkey PRIMARY KEY (id);


--
-- Name: auth_permission_content_type_id_codename_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_key UNIQUE (content_type_id, codename);


--
-- Name: auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_user_id_group_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_key UNIQUE (user_id, group_id);


--
-- Name: auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_user_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_key UNIQUE (user_id, permission_id);


--
-- Name: auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: config_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY config_config
    ADD CONSTRAINT config_config_pkey PRIMARY KEY (id);


--
-- Name: crm_crmadapter_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY crm_crmadapter
    ADD CONSTRAINT crm_crmadapter_pkey PRIMARY KEY (id);


--
-- Name: crm_crmadapteroption_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY crm_crmadapteroption
    ADD CONSTRAINT crm_crmadapteroption_pkey PRIMARY KEY (id);


--
-- Name: crm_crmadaptertype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY crm_crmadaptertype
    ADD CONSTRAINT crm_crmadaptertype_pkey PRIMARY KEY (id);


--
-- Name: crm_crmcustomer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY crm_crmcustomer
    ADD CONSTRAINT crm_crmcustomer_pkey PRIMARY KEY (id);


--
-- Name: crm_crmcustomernumber_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY crm_crmcustomernumber
    ADD CONSTRAINT crm_crmcustomernumber_pkey PRIMARY KEY (id);


--
-- Name: crm_crmdialogform_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY crm_crmdialogform
    ADD CONSTRAINT crm_crmdialogform_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_comment_flags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_comment_flags
    ADD CONSTRAINT django_comment_flags_pkey PRIMARY KEY (id);


--
-- Name: django_comment_flags_user_id_comment_id_flag_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_comment_flags
    ADD CONSTRAINT django_comment_flags_user_id_comment_id_flag_key UNIQUE (user_id, comment_id, flag);


--
-- Name: django_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_comments
    ADD CONSTRAINT django_comments_pkey PRIMARY KEY (id);


--
-- Name: django_content_type_app_label_model_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_key UNIQUE (app_label, model);


--
-- Name: django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: formunculous_application_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_application
    ADD CONSTRAINT formunculous_application_pkey PRIMARY KEY (id);


--
-- Name: formunculous_applicationdefin_applicationdefinition_id_site_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_applicationdefinition_sites
    ADD CONSTRAINT formunculous_applicationdefin_applicationdefinition_id_site_key UNIQUE (applicationdefinition_id, site_id);


--
-- Name: formunculous_applicationdefin_applicationdefinition_id_user_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_applicationdefinition_reviewers
    ADD CONSTRAINT formunculous_applicationdefin_applicationdefinition_id_user_key UNIQUE (applicationdefinition_id, user_id);


--
-- Name: formunculous_applicationdefinition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_applicationdefinition
    ADD CONSTRAINT formunculous_applicationdefinition_pkey PRIMARY KEY (id);


--
-- Name: formunculous_applicationdefinition_reviewers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_applicationdefinition_reviewers
    ADD CONSTRAINT formunculous_applicationdefinition_reviewers_pkey PRIMARY KEY (id);


--
-- Name: formunculous_applicationdefinition_sites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_applicationdefinition_sites
    ADD CONSTRAINT formunculous_applicationdefinition_sites_pkey PRIMARY KEY (id);


--
-- Name: formunculous_applicationdefinition_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_applicationdefinition
    ADD CONSTRAINT formunculous_applicationdefinition_slug_key UNIQUE (slug);


--
-- Name: formunculous_basefield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_basefield
    ADD CONSTRAINT formunculous_basefield_pkey PRIMARY KEY (id);


--
-- Name: formunculous_booleanfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_booleanfield
    ADD CONSTRAINT formunculous_booleanfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_datefield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_datefield
    ADD CONSTRAINT formunculous_datefield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_documentfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_documentfield
    ADD CONSTRAINT formunculous_documentfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_dropdownchoices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_dropdownchoices
    ADD CONSTRAINT formunculous_dropdownchoices_pkey PRIMARY KEY (id);


--
-- Name: formunculous_emailfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_emailfield
    ADD CONSTRAINT formunculous_emailfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_fielddefinition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_fielddefinition
    ADD CONSTRAINT formunculous_fielddefinition_pkey PRIMARY KEY (id);


--
-- Name: formunculous_filefield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_filefield
    ADD CONSTRAINT formunculous_filefield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_floatfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_floatfield
    ADD CONSTRAINT formunculous_floatfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_form_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_form
    ADD CONSTRAINT formunculous_form_pkey PRIMARY KEY (id);


--
-- Name: formunculous_imagefield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_imagefield
    ADD CONSTRAINT formunculous_imagefield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_integerfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_integerfield
    ADD CONSTRAINT formunculous_integerfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_ipaddressfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_ipaddressfield
    ADD CONSTRAINT formunculous_ipaddressfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_positiveintegerfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_positiveintegerfield
    ADD CONSTRAINT formunculous_positiveintegerfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_subapplicationdefinition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_subapplicationdefinition
    ADD CONSTRAINT formunculous_subapplicationdefinition_pkey PRIMARY KEY (id);


--
-- Name: formunculous_textarea_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_textarea
    ADD CONSTRAINT formunculous_textarea_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_textfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_textfield
    ADD CONSTRAINT formunculous_textfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_urlfield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_urlfield
    ADD CONSTRAINT formunculous_urlfield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_usphonenumber_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_usphonenumber
    ADD CONSTRAINT formunculous_usphonenumber_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_usstatefield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_usstatefield
    ADD CONSTRAINT formunculous_usstatefield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: formunculous_uszipcodefield_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY formunculous_uszipcodefield
    ADD CONSTRAINT formunculous_uszipcodefield_pkey PRIMARY KEY (basefield_ptr_id);


--
-- Name: ucall_userprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY ucall_userprofile
    ADD CONSTRAINT ucall_userprofile_pkey PRIMARY KEY (id);


--
-- Name: ucall_userprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY ucall_userprofile
    ADD CONSTRAINT ucall_userprofile_user_id_key UNIQUE (user_id);


--
-- Name: auth_group_permissions_group_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_group_permissions_group_id ON auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_group_permissions_permission_id ON auth_group_permissions USING btree (permission_id);


--
-- Name: auth_message_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_message_user_id ON auth_message USING btree (user_id);


--
-- Name: auth_permission_content_type_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_permission_content_type_id ON auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_groups_group_id ON auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_groups_user_id ON auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_permission_id ON auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_user_id ON auth_user_user_permissions USING btree (user_id);


--
-- Name: crm_crmadapter_type_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX crm_crmadapter_type_id ON crm_crmadapter USING btree (type_id);


--
-- Name: crm_crmadapteroption_adapter_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX crm_crmadapteroption_adapter_id ON crm_crmadapteroption USING btree (adapter_id);


--
-- Name: crm_crmcustomer_phone_number_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX crm_crmcustomer_phone_number_id ON crm_crmcustomer USING btree (phone_number_id);


--
-- Name: crm_crmcustomernumber_crm_adapter_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX crm_crmcustomernumber_crm_adapter_id ON crm_crmcustomernumber USING btree (crm_adapter_id);


--
-- Name: crm_crmcustomernumber_dialog_form_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX crm_crmcustomernumber_dialog_form_id ON crm_crmcustomernumber USING btree (dialog_form_id);


--
-- Name: django_admin_log_content_type_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_admin_log_content_type_id ON django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_admin_log_user_id ON django_admin_log USING btree (user_id);


--
-- Name: django_comment_flags_comment_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_comment_flags_comment_id ON django_comment_flags USING btree (comment_id);


--
-- Name: django_comment_flags_flag; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_comment_flags_flag ON django_comment_flags USING btree (flag);


--
-- Name: django_comment_flags_flag_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_comment_flags_flag_like ON django_comment_flags USING btree (flag varchar_pattern_ops);


--
-- Name: django_comment_flags_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_comment_flags_user_id ON django_comment_flags USING btree (user_id);


--
-- Name: django_comments_content_type_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_comments_content_type_id ON django_comments USING btree (content_type_id);


--
-- Name: django_comments_site_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_comments_site_id ON django_comments USING btree (site_id);


--
-- Name: django_comments_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_comments_user_id ON django_comments USING btree (user_id);


--
-- Name: django_session_expire_date; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX django_session_expire_date ON django_session USING btree (expire_date);


--
-- Name: formunculous_application_app_definition_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_application_app_definition_id ON formunculous_application USING btree (app_definition_id);


--
-- Name: formunculous_application_parent_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_application_parent_id ON formunculous_application USING btree (parent_id);


--
-- Name: formunculous_application_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_application_user_id ON formunculous_application USING btree (user_id);


--
-- Name: formunculous_applicationdefinition_parent_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_applicationdefinition_parent_id ON formunculous_applicationdefinition USING btree (parent_id);


--
-- Name: formunculous_applicationdefinition_reviewers_applicationdef3367; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_applicationdefinition_reviewers_applicationdef3367 ON formunculous_applicationdefinition_reviewers USING btree (applicationdefinition_id);


--
-- Name: formunculous_applicationdefinition_reviewers_user_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_applicationdefinition_reviewers_user_id ON formunculous_applicationdefinition_reviewers USING btree (user_id);


--
-- Name: formunculous_applicationdefinition_sites_applicationdefinit39e0; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_applicationdefinition_sites_applicationdefinit39e0 ON formunculous_applicationdefinition_sites USING btree (applicationdefinition_id);


--
-- Name: formunculous_applicationdefinition_sites_site_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_applicationdefinition_sites_site_id ON formunculous_applicationdefinition_sites USING btree (site_id);


--
-- Name: formunculous_basefield_app_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_basefield_app_id ON formunculous_basefield USING btree (app_id);


--
-- Name: formunculous_basefield_field_def_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_basefield_field_def_id ON formunculous_basefield USING btree (field_def_id);


--
-- Name: formunculous_dropdownchoices_field_definition_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_dropdownchoices_field_definition_id ON formunculous_dropdownchoices USING btree (field_definition_id);


--
-- Name: formunculous_fielddefinition_application_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_fielddefinition_application_id ON formunculous_fielddefinition USING btree (application_id);


--
-- Name: formunculous_fielddefinition_slug; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_fielddefinition_slug ON formunculous_fielddefinition USING btree (slug);


--
-- Name: formunculous_fielddefinition_slug_like; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_fielddefinition_slug_like ON formunculous_fielddefinition USING btree (slug varchar_pattern_ops);


--
-- Name: formunculous_subapplicationdefinition_app_definition_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX formunculous_subapplicationdefinition_app_definition_id ON formunculous_subapplicationdefinition USING btree (app_definition_id);


--
-- Name: applicationdefinition_id_refs_id_1c970c7c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_applicationdefinition_reviewers
    ADD CONSTRAINT applicationdefinition_id_refs_id_1c970c7c FOREIGN KEY (applicationdefinition_id) REFERENCES formunculous_applicationdefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: applicationdefinition_id_refs_id_371d6d3c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_applicationdefinition_sites
    ADD CONSTRAINT applicationdefinition_id_refs_id_371d6d3c FOREIGN KEY (applicationdefinition_id) REFERENCES formunculous_applicationdefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_message_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_message
    ADD CONSTRAINT auth_message_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: content_type_id_refs_id_728de91f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT content_type_id_refs_id_728de91f FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: crm_crmadapter_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY crm_crmadapter
    ADD CONSTRAINT crm_crmadapter_type_id_fkey FOREIGN KEY (type_id) REFERENCES crm_crmadaptertype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: crm_crmadapteroption_adapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY crm_crmadapteroption
    ADD CONSTRAINT crm_crmadapteroption_adapter_id_fkey FOREIGN KEY (adapter_id) REFERENCES crm_crmadapter(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: crm_crmcustomer_phone_number_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY crm_crmcustomer
    ADD CONSTRAINT crm_crmcustomer_phone_number_id_fkey FOREIGN KEY (phone_number_id) REFERENCES crm_crmcustomernumber(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: crm_crmcustomernumber_crm_adapter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY crm_crmcustomernumber
    ADD CONSTRAINT crm_crmcustomernumber_crm_adapter_id_fkey FOREIGN KEY (crm_adapter_id) REFERENCES crm_crmadapter(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: crm_crmcustomernumber_dialog_form_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY crm_crmcustomernumber
    ADD CONSTRAINT crm_crmcustomernumber_dialog_form_id_fkey FOREIGN KEY (dialog_form_id) REFERENCES formunculous_applicationdefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_content_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_fkey FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_comment_flags_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY django_comment_flags
    ADD CONSTRAINT django_comment_flags_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES django_comments(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_comment_flags_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY django_comment_flags
    ADD CONSTRAINT django_comment_flags_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_comments_content_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY django_comments
    ADD CONSTRAINT django_comments_content_type_id_fkey FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY django_comments
    ADD CONSTRAINT django_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_application_app_definition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_application
    ADD CONSTRAINT formunculous_application_app_definition_id_fkey FOREIGN KEY (app_definition_id) REFERENCES formunculous_applicationdefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_application_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_application
    ADD CONSTRAINT formunculous_application_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_applicationdefinition_reviewers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_applicationdefinition_reviewers
    ADD CONSTRAINT formunculous_applicationdefinition_reviewers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_basefield_app_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_basefield
    ADD CONSTRAINT formunculous_basefield_app_id_fkey FOREIGN KEY (app_id) REFERENCES formunculous_application(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_basefield_field_def_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_basefield
    ADD CONSTRAINT formunculous_basefield_field_def_id_fkey FOREIGN KEY (field_def_id) REFERENCES formunculous_fielddefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_booleanfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_booleanfield
    ADD CONSTRAINT formunculous_booleanfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_datefield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_datefield
    ADD CONSTRAINT formunculous_datefield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_documentfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_documentfield
    ADD CONSTRAINT formunculous_documentfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_dropdownchoices_field_definition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_dropdownchoices
    ADD CONSTRAINT formunculous_dropdownchoices_field_definition_id_fkey FOREIGN KEY (field_definition_id) REFERENCES formunculous_fielddefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_emailfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_emailfield
    ADD CONSTRAINT formunculous_emailfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_fielddefinition_application_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_fielddefinition
    ADD CONSTRAINT formunculous_fielddefinition_application_id_fkey FOREIGN KEY (application_id) REFERENCES formunculous_applicationdefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_filefield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_filefield
    ADD CONSTRAINT formunculous_filefield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_floatfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_floatfield
    ADD CONSTRAINT formunculous_floatfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_imagefield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_imagefield
    ADD CONSTRAINT formunculous_imagefield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_integerfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_integerfield
    ADD CONSTRAINT formunculous_integerfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_ipaddressfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_ipaddressfield
    ADD CONSTRAINT formunculous_ipaddressfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_positiveintegerfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_positiveintegerfield
    ADD CONSTRAINT formunculous_positiveintegerfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_subapplicationdefinition_app_definition_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_subapplicationdefinition
    ADD CONSTRAINT formunculous_subapplicationdefinition_app_definition_id_fkey FOREIGN KEY (app_definition_id) REFERENCES formunculous_applicationdefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_textarea_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_textarea
    ADD CONSTRAINT formunculous_textarea_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_textfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_textfield
    ADD CONSTRAINT formunculous_textfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_urlfield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_urlfield
    ADD CONSTRAINT formunculous_urlfield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_usphonenumber_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_usphonenumber
    ADD CONSTRAINT formunculous_usphonenumber_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_usstatefield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_usstatefield
    ADD CONSTRAINT formunculous_usstatefield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: formunculous_uszipcodefield_basefield_ptr_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_uszipcodefield
    ADD CONSTRAINT formunculous_uszipcodefield_basefield_ptr_id_fkey FOREIGN KEY (basefield_ptr_id) REFERENCES formunculous_basefield(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: group_id_refs_id_3cea63fe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT group_id_refs_id_3cea63fe FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: parent_id_refs_id_3909383d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_application
    ADD CONSTRAINT parent_id_refs_id_3909383d FOREIGN KEY (parent_id) REFERENCES formunculous_application(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: parent_id_refs_id_393ccdb7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY formunculous_applicationdefinition
    ADD CONSTRAINT parent_id_refs_id_393ccdb7 FOREIGN KEY (parent_id) REFERENCES formunculous_applicationdefinition(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ucall_userprofile_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ucall_userprofile
    ADD CONSTRAINT ucall_userprofile_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_7ceef80f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT user_id_refs_id_7ceef80f FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_dfbab7d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT user_id_refs_id_dfbab7d FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

