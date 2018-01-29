package com.edu.um.programacion2.web.rest;

import com.edu.um.programacion2.TrabajoFinalApp;

import com.edu.um.programacion2.domain.Notificaciones;
import com.edu.um.programacion2.repository.NotificacionesRepository;
import com.edu.um.programacion2.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.edu.um.programacion2.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NotificacionesResource REST controller.
 *
 * @see NotificacionesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TrabajoFinalApp.class)
public class NotificacionesResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private NotificacionesRepository notificacionesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNotificacionesMockMvc;

    private Notificaciones notificaciones;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotificacionesResource notificacionesResource = new NotificacionesResource(notificacionesRepository);
        this.restNotificacionesMockMvc = MockMvcBuilders.standaloneSetup(notificacionesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notificaciones createEntity(EntityManager em) {
        Notificaciones notificaciones = new Notificaciones()
            .descripcion(DEFAULT_DESCRIPCION);
        return notificaciones;
    }

    @Before
    public void initTest() {
        notificaciones = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotificaciones() throws Exception {
        int databaseSizeBeforeCreate = notificacionesRepository.findAll().size();

        // Create the Notificaciones
        restNotificacionesMockMvc.perform(post("/api/notificaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificaciones)))
            .andExpect(status().isCreated());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeCreate + 1);
        Notificaciones testNotificaciones = notificacionesList.get(notificacionesList.size() - 1);
        assertThat(testNotificaciones.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createNotificacionesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notificacionesRepository.findAll().size();

        // Create the Notificaciones with an existing ID
        notificaciones.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotificacionesMockMvc.perform(post("/api/notificaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificaciones)))
            .andExpect(status().isBadRequest());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        // Get all the notificacionesList
        restNotificacionesMockMvc.perform(get("/api/notificaciones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notificaciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }

    @Test
    @Transactional
    public void getNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);

        // Get the notificaciones
        restNotificacionesMockMvc.perform(get("/api/notificaciones/{id}", notificaciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(notificaciones.getId().intValue()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNotificaciones() throws Exception {
        // Get the notificaciones
        restNotificacionesMockMvc.perform(get("/api/notificaciones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();

        // Update the notificaciones
        Notificaciones updatedNotificaciones = notificacionesRepository.findOne(notificaciones.getId());
        // Disconnect from session so that the updates on updatedNotificaciones are not directly saved in db
        em.detach(updatedNotificaciones);
        updatedNotificaciones
            .descripcion(UPDATED_DESCRIPCION);

        restNotificacionesMockMvc.perform(put("/api/notificaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotificaciones)))
            .andExpect(status().isOk());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate);
        Notificaciones testNotificaciones = notificacionesList.get(notificacionesList.size() - 1);
        assertThat(testNotificaciones.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingNotificaciones() throws Exception {
        int databaseSizeBeforeUpdate = notificacionesRepository.findAll().size();

        // Create the Notificaciones

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNotificacionesMockMvc.perform(put("/api/notificaciones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(notificaciones)))
            .andExpect(status().isCreated());

        // Validate the Notificaciones in the database
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNotificaciones() throws Exception {
        // Initialize the database
        notificacionesRepository.saveAndFlush(notificaciones);
        int databaseSizeBeforeDelete = notificacionesRepository.findAll().size();

        // Get the notificaciones
        restNotificacionesMockMvc.perform(delete("/api/notificaciones/{id}", notificaciones.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Notificaciones> notificacionesList = notificacionesRepository.findAll();
        assertThat(notificacionesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Notificaciones.class);
        Notificaciones notificaciones1 = new Notificaciones();
        notificaciones1.setId(1L);
        Notificaciones notificaciones2 = new Notificaciones();
        notificaciones2.setId(notificaciones1.getId());
        assertThat(notificaciones1).isEqualTo(notificaciones2);
        notificaciones2.setId(2L);
        assertThat(notificaciones1).isNotEqualTo(notificaciones2);
        notificaciones1.setId(null);
        assertThat(notificaciones1).isNotEqualTo(notificaciones2);
    }
}
