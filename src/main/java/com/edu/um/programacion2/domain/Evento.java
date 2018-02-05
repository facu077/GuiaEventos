package com.edu.um.programacion2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;

    @Column(name = "hora")
    private String hora;

    @Lob
    @Column(name = "imagenes")
    private byte[] imagenes;

    @Column(name = "imagenes_content_type")
    private String imagenesContentType;

    @Column(name = "destacado")
    private Boolean destacado;

    @Column(name = "estado")
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

    @ManyToMany(mappedBy = "eventoRegistrados")
    private Set<Usuario> usuarioRegistrados = new HashSet<>();

    @ManyToMany(mappedBy = "eventoFavoritos")
    private Set<Usuario> usuarioFavoritos = new HashSet<>();

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

    public LocalDate getFecha() {
        return fecha;
    }

    public Evento fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public Evento hora(String hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(String hora) {
        this.hora = hora;
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
        tags.getEventos().add(this);
        return this;
    }

    public Evento removeTags(Tags tags) {
        this.tags.remove(tags);
        tags.getEventos().remove(this);
        return this;
    }

    public void setTags(Set<Tags> tags) {
        this.tags = tags;
    }

    public Set<Usuario> getUsuarioRegistrados() {
        return usuarioRegistrados;
    }

    public Evento usuarioRegistrados(Set<Usuario> usuarios) {
        this.usuarioRegistrados = usuarios;
        return this;
    }

    public Evento addUsuarioRegistrado(Usuario usuario) {
        this.usuarioRegistrados.add(usuario);
        usuario.getEventoRegistrados().add(this);
        return this;
    }

    public Evento removeUsuarioRegistrado(Usuario usuario) {
        this.usuarioRegistrados.remove(usuario);
        usuario.getEventoRegistrados().remove(this);
        return this;
    }

    public void setUsuarioRegistrados(Set<Usuario> usuarios) {
        this.usuarioRegistrados = usuarios;
    }

    public Set<Usuario> getUsuarioFavoritos() {
        return usuarioFavoritos;
    }

    public Evento usuarioFavoritos(Set<Usuario> usuarios) {
        this.usuarioFavoritos = usuarios;
        return this;
    }

    public Evento addUsuarioFavorito(Usuario usuario) {
        this.usuarioFavoritos.add(usuario);
        usuario.getEventoFavoritos().add(this);
        return this;
    }

    public Evento removeUsuarioFavorito(Usuario usuario) {
        this.usuarioFavoritos.remove(usuario);
        usuario.getEventoFavoritos().remove(this);
        return this;
    }

    public void setUsuarioFavoritos(Set<Usuario> usuarios) {
        this.usuarioFavoritos = usuarios;
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
            ", fecha='" + getFecha() + "'" +
            ", hora='" + getHora() + "'" +
            ", imagenes='" + getImagenes() + "'" +
            ", imagenesContentType='" + getImagenesContentType() + "'" +
            ", destacado='" + isDestacado() + "'" +
            ", estado='" + isEstado() + "'" +
            "}";
    }
}
