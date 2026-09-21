-- Table: public.phone_series

-- DROP TABLE IF EXISTS public.phone_series;

CREATE TABLE IF NOT EXISTS public.phone_series
(
    series_id serial NOT NULL,
    brand_id integer NOT NULL,
    series_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT phone_series_pkey PRIMARY KEY (series_id),
    CONSTRAINT uq_brand_series UNIQUE (brand_id, series_name),
    CONSTRAINT fk_series_brand FOREIGN KEY (brand_id)
        REFERENCES public.brands (brand_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.phone_series
    OWNER to postgres;