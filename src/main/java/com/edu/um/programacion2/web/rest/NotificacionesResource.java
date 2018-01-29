package com.edu.um.programacion2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.um.programacion2.domain.Notificaciones;

import com.edu.um.programacion2.repository.NotificacionesRepository;
import com.edu.um.programacion2.web.rest.errors.BadRequestAlertException;
import com.edu.um.programacion2.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Notificaciones.
 */
@RestController
@RequestMapping("/api")
public class NotificacionesResource {

    private final Logger log = LoggerFactory.getLogger(NotificacionesResource.class);

    private static final String ENTITY_NAME = "notificaciones";

    private final NotificacionesRepository notificacionesRepository;

    public NotificacionesResource(NotificacionesRepository notificacionesRepository) {
        this.notificacionesRepository = notificacionesRepository;
    }

    /**
     * POST  /notificaciones : Create a new notificaciones.
     *
     * @param notificaciones the notificaciones to create
     * @return the ResponseEntity with status 201 (Created) and with body the new notificaciones, or with status 400 (Bad Request) if the notificaciones has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notificaciones")
    @Timed
    public ResponseEntity<Notificaciones> createNotificaciones(@RequestBody Notificaciones notificaciones) throws URISyntaxException {
        log.debug("REST request to save Notificaciones : {}", notificaciones);
        if (notificaciones.getId() != null) {
            throw new BadRequestAlertException("A new notificaciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Notificaciones result = notificacionesRepository.save(notificaciones);
        return ResponseEntity.created(new URI("/api/notificaciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notificaciones : Updates an existing notificaciones.
     *
     * @param notificaciones the notificaciones to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated notificaciones,
     * or with status 400 (Bad Request) if the notificaciones is not valid,
     * or with status 500 (Internal Server Error) if the notificaciones couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notificaciones")
    @Timed
    public ResponseEntity<Notificaciones> updateNotificaciones(@RequestBody Notificaciones notificaciones) throws URISyntaxException {
        log.debug("REST request to update Notificaciones : {}", notificaciones);
        if (notificaciones.getId() == null) {
            return createNotificaciones(notificaciones);
        }
        Notificaciones result = notificacionesRepository.save(notificaciones);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, notificaciones.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notificaciones : get all the notificaciones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notificaciones in body
     */
    @GetMapping("/notificaciones")
    @Timed
    public List<Notificaciones> getAllNotificaciones() {
        log.debug("REST request to get all Notificaciones");
        return notificacionesRepository.findAll();
        }

    /**
     * GET  /notificaciones/:id : get the "id" notificaciones.
     *
     * @param id the id of the notificaciones to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the notificaciones, or with status 404 (Not Found)
     */
    @GetMapping("/notificaciones/{id}")
    @Timed
    public ResponseEntity<Notificaciones> getNotificaciones(@PathVariable Long id) {
        log.debug("REST request to get Notificaciones : {}", id);
        Notificaciones notificaciones = notificacionesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(notificaciones));
    }

    /**
     * DELETE  /notificaciones/:id : delete the "id" notificaciones.
     *
     * @param id the id of the notificaciones to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notificaciones/{id}")
    @Timed
    public ResponseEntity<Void> deleteNotificaciones(@PathVariable Long id) {
        log.debug("REST request to delete Notificaciones : {}", id);
        notificacionesRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
