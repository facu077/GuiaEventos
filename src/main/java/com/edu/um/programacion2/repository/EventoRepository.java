package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Evento;
import com.edu.um.programacion2.domain.Tags;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Evento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
    @Query("select distinct evento from Evento evento left join fetch evento.tags left join fetch evento.usuarioRegistrados left join fetch evento.usuarioFavoritos")
    List<Evento> findAllWithEagerRelationships();

    @Query("select evento from Evento evento left join fetch evento.tags left join fetch evento.usuarioRegistrados left join fetch evento.usuarioFavoritos where evento.id =:id")
    Evento findOneWithEagerRelationships(@Param("id") Long id);
    
    @Query(value = "select jhi_user.id from jhi_user where jhi_user.login = :login",
            nativeQuery=true
    )
    Long getUserId(@Param("login") String login);
    
    @Query(value = "select * from evento where usuario_creador_id = :id",
            nativeQuery=true
    )
    List<Evento> findUserEventos(@Param("id") Long id);
    
    @Transactional
    @Modifying
    @Query(value = "UPDATE evento SET usuario_creador_id = (select id from jhi_user where login = :login) WHERE evento.id = :idEvento",
            nativeQuery=true
    )
    void saveCreador(@Param("login") String login, @Param("idEvento") Long idEvento);
    
    @Query(value = "select estado from evento where id = :id",
            nativeQuery=true
    )
    Boolean getEstado(@Param("id") Long id);
    
    @Transactional
    @Modifying
    @Query(value = "UPDATE evento SET estado = :estado WHERE evento.id = :id",
            nativeQuery=true
    )
    void updateEstado(@Param("id") Long id, @Param("estado") Boolean estado);
}
