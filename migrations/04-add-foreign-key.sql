ALTER TABLE Albums
    ADD CONSTRAINT fk_artist_id FOREIGN KEY (artist_id) REFERENCES Artists (id);