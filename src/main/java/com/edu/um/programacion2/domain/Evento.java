package com.edu.um.programacion2.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Evento.
 */
@Entity
@Table(name = "evento")
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Lob
    @Column(name = "resumen", nullable = false)
    private String resumen;

    @NotNull
    @Lob
    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @NotNull
    @Column(name = "precio", nullable = false)
    private Integer precio;

    @NotNull
    @Column(name = "ubicacion", nullable = false)
    private String ubicacion;

    @NotNull
    @Column(name = "horario", nullable = false)
    private LocalDate horario;

    @NotNull
    @Lob
    @Column(name = "imagenes", nullable = false)
    private byte[] imagenes;

    @Column(name = "imagenes_content_type", nullable = false)
    private String imagenesContentType;

    @NotNull
    @Column(name = "destacado", nullable = false)
    private Boolean destacado;

    @NotNull
    @Column(name = "estado", nullable = false)
    private Boolean estado;

    @ManyToOne
    private Categoria categoria;

    @ManyToOne
    private Usuario usuarioCreador;

    @ManyToMany
    @JoinTable(name = "evento_tags",
               joinColumns = @JoinColumn(name="eventos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tags_id", referencedColumnName="id"))
    private Set<Tags> tags = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Evento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getResumen() {
        return resumen;
    }

    public Evento resumen(String resumen) {
        this.resumen = resumen;
        return this;
    }

    public void setResumen(String resumen) {
        this.resumen = resumen;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Evento descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public Evento precio(Integer precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Evento ubicacion(String ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public LocalDate getHorario() {
        return horario;
    }

    public Evento horario(LocalDate horario) {
        this.horario = horario;
        return this;
    }

    public void setHorario(LocalDate horario) {
        this.horario = horario;
    }

    public byte[] getImagenes() {
        return imagenes;
    }

    public Evento imagenes(byte[] imagenes) {
        this.imagenes = imagenes;
        return this;
    }

    public void setImagenes(byte[] imagenes) {
        this.imagenes = imagenes;
    }

    public String getImagenesContentType() {
        return imagenesContentType;
    }

    public Evento imagenesContentType(String imagenesContentType) {
        this.imagenesContentType = imagenesContentType;
        return this;
    }

    public void setImagenesContentType(String imagenesContentType) {
        this.imagenesContentType = imagenesContentType;
    }

    public Boolean isDestacado() {
        return destacado;
    }

    public Evento destacado(Boolean destacado) {
        this.destacado = destacado;
        return this;
    }

    public void setDestacado(Boolean destacado) {
        this.destacado = destacado;
    }

    public Boolean isEstado() {
        return estado;
    }

    public Evento estado(Boolean estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Evento categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Usuario getUsuarioCreador() {
        return usuarioCreador;
    }

    public Evento usuarioCreador(Usuario usuario) {
        this.usuarioCreador = usuario;
        return this;
    }

    public void setUsuarioCreador(Usuario usuario) {
        this.usuarioCreador = usuario;
    }

    public Set<Tags> getTags() {
        return tags;
    }

    public Evento tags(Set<Tags> tags) {
        this.tags = tags;
        return this;
    }

    public Evento addTags(Tags tags) {
        this.tags.add(tags);
        return this;
    }

    public Evento removeTags(Tags tags) {
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
        Evento evento = (Evento) o;
        if (evento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", resumen='" + getResumen() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precio=" + getPrecio() +
            ", ubicacion='" + getUbicacion() + "'" +
            ", horario='" + getHorario() + "'" +
            ", imagenes='" + getImagenes() + "'" +
            ", imagenesContentType='" + getImagenesContentType() + "'" +
            ", destacado='" + isDestacado() + "'" +
            ", estado='" + isEstado() + "'" +
            "}";
    }
}
