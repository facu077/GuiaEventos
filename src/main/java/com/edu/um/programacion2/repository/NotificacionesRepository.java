package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Notificaciones;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Notificaciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificacionesRepository extends JpaRepository<Notificaciones, Long> {

}
