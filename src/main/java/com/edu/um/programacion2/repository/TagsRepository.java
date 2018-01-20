package com.edu.um.programacion2.repository;

import com.edu.um.programacion2.domain.Tags;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the Tags entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TagsRepository extends JpaRepository<Tags, Long> {
    @Query(value = "select tags.id, tags.nombre from tags left join usuario_tag on tags_id = tags.id where usuario_tag.usuarios_id =:id",
            nativeQuery=true
    )
    List<Tags> findUserTags(@Param("id") Long id);
}
