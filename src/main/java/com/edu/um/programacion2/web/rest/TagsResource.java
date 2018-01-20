package com.edu.um.programacion2.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.edu.um.programacion2.domain.Tags;

import com.edu.um.programacion2.repository.TagsRepository;
import com.edu.um.programacion2.web.rest.errors.BadRequestAlertException;
import com.edu.um.programacion2.web.rest.util.HeaderUtil;
import com.edu.um.programacion2.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tags.
 */
@RestController
@RequestMapping("/api")
public class TagsResource {

    private final Logger log = LoggerFactory.getLogger(TagsResource.class);

    private static final String ENTITY_NAME = "tags";

    private final TagsRepository tagsRepository;

    public TagsResource(TagsRepository tagsRepository) {
        this.tagsRepository = tagsRepository;
    }

    /**
     * POST  /tags : Create a new tags.
     *
     * @param tags the tags to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tags, or with status 400 (Bad Request) if the tags has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tags")
    @Timed
    public ResponseEntity<Tags> createTags(@Valid @RequestBody Tags tags) throws URISyntaxException {
        log.debug("REST request to save Tags : {}", tags);
        if (tags.getId() != null) {
            throw new BadRequestAlertException("A new tags cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tags result = tagsRepository.save(tags);
        return ResponseEntity.created(new URI("/api/tags/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tags : Updates an existing tags.
     *
     * @param tags the tags to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tags,
     * or with status 400 (Bad Request) if the tags is not valid,
     * or with status 500 (Internal Server Error) if the tags couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tags")
    @Timed
    public ResponseEntity<Tags> updateTags(@Valid @RequestBody Tags tags) throws URISyntaxException {
        log.debug("REST request to update Tags : {}", tags);
        if (tags.getId() == null) {
            return createTags(tags);
        }
        Tags result = tagsRepository.save(tags);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tags.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tags : get all the tags.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tags in body
     */
    @GetMapping("/tags")
    @Timed
    public ResponseEntity<List<Tags>> getAllTags(Pageable pageable) {
        log.debug("REST request to get a page of Tags");
        Page<Tags> page = tagsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tags");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tags/:id : get the "id" tags.
     *
     * @param id the id of the tags to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tags, or with status 404 (Not Found)
     */
    @GetMapping("/tags/{id}")
    @Timed
    public ResponseEntity<Tags> getTags(@PathVariable Long id) {
        log.debug("REST request to get Tags : {}", id);
        Tags tags = tagsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tags));
    }

    /**
     * DELETE  /tags/:id : delete the "id" tags.
     *
     * @param id the id of the tags to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tags/{id}")
    @Timed
    public ResponseEntity<Void> deleteTags(@PathVariable Long id) {
        log.debug("REST request to delete Tags : {}", id);
        tagsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    /*@GetMapping("/tagsUsuario")
    @Timed
    public List<Tags> getAlgo() {
        log.debug("REST request get tagsUsuario");
        return tagsRepository.findUnUsuario(5L);
    }*/
    
    @GetMapping("/tagsUsuario")
    @Timed
    public ResponseEntity<List<Tags>> getTagsUsuario(Pageable pageable) {
        log.debug("REST request to get a page of Tags");
        List<Tags> tags = tagsRepository.findUserTags(5L);
        final Page<Tags> page = new PageImpl<>(tags);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tags");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
