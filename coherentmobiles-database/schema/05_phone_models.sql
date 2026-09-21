-- Table: public.phone_models

-- DROP TABLE IF EXISTS public.phone_models;

CREATE TABLE IF NOT EXISTS public.phone_models
(
    model_id serial NOT NULL,
    series_id integer NOT NULL,
    model_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    image_url character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT phone_models_pkey PRIMARY KEY (model_id),
    CONSTRAINT uq_series_model UNIQUE (series_id, model_name),
    CONSTRAINT fk_model_series FOREIGN KEY (series_id)
        REFERENCES public.phone_series (series_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.phone_models
    OWNER to postgres;