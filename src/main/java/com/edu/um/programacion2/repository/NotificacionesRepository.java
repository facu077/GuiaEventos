package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Evento;
import com.edu.um.programacion2.domain.Notificaciones;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the Notificaciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificacionesRepository extends JpaRepository<Notificaciones, Long> {
	
    @Query(value = "select jhi_user.id from jhi_user where jhi_user.login = :login",
            nativeQuery=true
    )
    Long getUserId(@Param("login") String login);
    
    @Query(value = "select * from notificaciones where usuario_id = :id",
            nativeQuery=true
    )
    List<Notificaciones> findUserNotificaciones(@Param("id") Long id);
}
