package mx.edu.utez.server.modules.saludo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SaludoRequest {
    private String nombre;
    private String apellido;
}

