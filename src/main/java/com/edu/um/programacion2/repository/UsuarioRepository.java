package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Tags;
import com.edu.um.programacion2.domain.Usuario;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Usuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("select distinct usuario from Usuario usuario left join fetch usuario.eventos left join fetch usuario.tags")
    List<Usuario> findAllWithEagerRelationships();

    @Query("select usuario from Usuario usuario left join fetch usuario.eventos left join fetch usuario.tags where usuario.id =:id")
    Usuario findOneWithEagerRelationships(@Param("id") Long id);
    
    @Query(value = "select jhi_user.id from jhi_user where jhi_user.login = :login",
            nativeQuery=true
    )
    Long getUserId(@Param("login") String login);
    
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO jhi_user_authority (user_id ,authority_name) VALUES (:id, 'ROLE_PRESTADOR')",
            nativeQuery=true
    )
    void addRole(@Param("id") Long id);
}
