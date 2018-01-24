package com.edu.um.programacion2.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.edu.um.programacion2.domain.enumeration.Sexo;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexo")
    private Sexo sexo;

    @NotNull
    @Column(name = "prestador", nullable = false)
    private Boolean prestador;

    @OneToOne
    @JoinColumn(unique = true)
    //@MapsId deberia estar pero rompe todo con los tags
    private User user;

    @ManyToMany
    @JoinTable(name = "usuario_evento",
               joinColumns = @JoinColumn(name="usuarios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="eventos_id", referencedColumnName="id"))
    private Set<Evento> eventos = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "usuario_tag",
               joinColumns = @JoinColumn(name="usuarios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tags_id", referencedColumnName="id"))
    private Set<Tags> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Usuario fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public Usuario sexo(Sexo sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public Boolean isPrestador() {
        return prestador;
    }

    public Usuario prestador(Boolean prestador) {
        this.prestador = prestador;
        return this;
    }

    public void setPrestador(Boolean prestador) {
        this.prestador = prestador;
    }

    public User getUser() {
        return user;
    }

    public Usuario user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Evento> getEventos() {
        return eventos;
    }

    public Usuario eventos(Set<Evento> eventos) {
        this.eventos = eventos;
        return this;
    }

    public Usuario addEvento(Evento evento) {
        this.eventos.add(evento);
        return this;
    }

    public Usuario removeEvento(Evento evento) {
        this.eventos.remove(evento);
        return this;
    }

    public void setEventos(Set<Evento> eventos) {
        this.eventos = eventos;
    }

    public Set<Tags> getTags() {
        return tags;
    }

    public Usuario tags(Set<Tags> tags) {
        this.tags = tags;
        return this;
    }

    public Usuario addTag(Tags tags) {
        this.tags.add(tags);
        return this;
    }

    public Usuario removeTag(Tags tags) {
        this.tags.remove(tags);
        return this;
    }

    public void setTags(Set<Tags> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Usuario usuario = (Usuario) o;
        if (usuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", prestador='" + isPrestador() + "'" +
            "}";
    }
}
