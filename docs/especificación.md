# Especificación del MVP 1

# Partido táctico por cartas

## 1. Propósito del documento

Este documento define la primera versión jugable del proyecto **La Mejenga: Camino a la Final**.

El objetivo no es describir todo el juego final, sino especificar con claridad el primer prototipo funcional: un partido corto de fútbol táctico por cartas, jugado contra una IA simple, con equipos predefinidos, jugadores, cartas, energía, momentum, marcador y narración.

Este MVP debe responder una pregunta central:

> ¿Elegir cartas tácticas en momentos clave de un partido se siente divertido, estratégico y emocionante?

Si la respuesta es sí, el juego puede avanzar hacia progresión, torneos, cuenta de usuario, amigos, multijugador, mensajes y funcionalidades sociales.

Si la respuesta es no, se debe ajustar primero el núcleo jugable antes de construir sistemas más grandes.

---

## 2. Objetivo del MVP

Crear una demo jugable donde el usuario pueda disputar un partido corto contra una IA simple.

El jugador debe poder:

* Elegir un equipo predefinido.
* Ver una plantilla básica.
* Iniciar un partido.
* Recibir situaciones o momentos clave.
* Elegir cartas tácticas.
* Ver la carta o respuesta rival.
* Resolver jugadas mediante reglas claras.
* Ver cambios en marcador, energía y momentum.
* Leer narraciones de cada jugada.
* Finalizar el partido y ver un resumen.

El MVP debe sentirse como un juego, no como una maqueta estática.

---

## 3. Alcance del MVP 1

### Incluye

* Modo partido rápido.
* Un jugador humano contra IA simple.
* Dos equipos predefinidos.
* Cinco jugadores por equipo.
* Un mazo básico de cartas.
* Partido dividido en momentos clave.
* Selección de carta por parte del usuario.
* Selección automática de carta por parte de la IA.
* Resolución de jugadas.
* Energía.
* Momentum.
* Marcador.
* Narración textual.
* Resumen final.
* Interfaz básica pero clara.
* Animaciones simples de cartas, barras y resultados.

### No incluye

* Login.
* Registro.
* Perfiles.
* Amigos.
* Mensajes.
* Multijugador online.
* Supabase.
* Base de datos persistente.
* Ranking.
* Mercado de fichajes.
* Modo carrera completo.
* Torneos largos.
* Personalización avanzada.
* Tienda.
* Cartas coleccionables.
* App móvil nativa.
* Fútbol en tiempo real.
* Jugadores moviéndose libremente en cancha.
* Motor 3D.

---

## 4. Concepto jugable del MVP

El partido se divide en una serie de **momentos clave**.

Cada momento representa una situación importante del partido:

* Ataque por banda.
* Ataque por el centro.
* Contraataque.
* Presión rival.
* Tiro libre.
* Córner.
* Jugada trabada.
* Última jugada.

En cada momento, el jugador debe elegir una carta. La IA rival elige una respuesta. El motor compara ambas cartas, los jugadores involucrados, la energía, el momentum y el contexto de la situación.

Después se genera un resultado:

* Gol.
* Tiro fallado.
* Atajada.
* Robo defensivo.
* Falta.
* Córner.
* Pérdida de balón.
* Ocasión clara.
* Jugada neutral.
* Cambio de momentum.

El partido termina después de una cantidad fija de momentos clave.

---

## 5. Formato del partido

### Configuración inicial recomendada

| Elemento                     |              Valor inicial |
| ---------------------------- | -------------------------: |
| Equipos disponibles          |                          2 |
| Jugadores por equipo         |                          5 |
| Momentos clave por partido   |                          8 |
| Cartas disponibles por turno |                          4 |
| Energía inicial por equipo   |                        100 |
| Momentum inicial             |                         50 |
| Duración aproximada          |              5 a 8 minutos |
| Rival                        |                  IA simple |
| Resultado                    | Gana quien anote más goles |

### Estructura del partido

El partido puede dividirse internamente en 8 momentos:

1. Minuto 8.
2. Minuto 17.
3. Minuto 28.
4. Minuto 41.
5. Minuto 53.
6. Minuto 66.
7. Minuto 78.
8. Minuto 89.

Estos minutos no necesitan simular cada acción del partido. Solo dan contexto narrativo.

---

## 6. Equipos iniciales

Para el MVP se usarán dos equipos predefinidos.

## 6.1 Los del Parque

Equipo equilibrado. No destaca de forma extrema en ningún área, pero puede competir bien en casi cualquier situación.

### Identidad

* Estilo: balanceado.
* Fortalezas: juego colectivo, estabilidad, mentalidad decente.
* Debilidades: no tiene una especialidad dominante.
* Dificultad de uso: baja.

### Jugadores

| Nombre             | Rol           | Ataque | Defensa | Técnica | Físico | Mentalidad | Resistencia | Rasgo                                                 |
| ------------------ | ------------- | -----: | ------: | ------: | -----: | ---------: | ----------: | ----------------------------------------------------- |
| Nico “El Seguro”   | Portero       |     25 |      72 |      45 |     60 |         70 |          65 | Ataja mejor en momentos de alta presión               |
| Mau “El Ordenado”  | Defensa       |     35 |      76 |      55 |     68 |         64 |          70 | Reduce errores defensivos                             |
| Sebas “El Cerebro” | Mediocampista |     58 |      55 |      78 |     55 |         72 |          68 | Mejora cartas de pase                                 |
| Leo “El Crack”     | Delantero     |     80 |      28 |      76 |     58 |         63 |          62 | Mejora en jugadas decisivas, pero consume más energía |
| Dani “Comodín”     | Comodín       |     60 |      60 |      60 |     60 |         60 |          70 | Se adapta a cualquier situación                       |

## 6.2 Cemento FC

Equipo físico y defensivo. Es fuerte en choques, bloqueos y partidos cerrados, pero puede sufrir contra equipos técnicos o rápidos.

### Identidad

* Estilo: físico-defensivo.
* Fortalezas: defensa, contacto, resistencia.
* Debilidades: menor creatividad ofensiva.
* Dificultad de uso: media.

### Jugadores

| Nombre             | Rol           | Ataque | Defensa | Técnica | Físico | Mentalidad | Resistencia | Rasgo                                                    |
| ------------------ | ------------- | -----: | ------: | ------: | -----: | ---------: | ----------: | -------------------------------------------------------- |
| Rolo “Manos Duras” | Portero       |     20 |      78 |      38 |     72 |         62 |          65 | Mejor contra tiros potentes, peor contra tiros colocados |
| Chino “El Muro”    | Defensa       |     28 |      84 |      42 |     82 |         66 |          74 | Mejora bloqueos y marca física                           |
| Kevin “Motorcito”  | Mediocampista |     50 |      68 |      58 |     76 |         64 |          82 | Gasta menos energía en presión                           |
| Bryan “Tanque”     | Delantero     |     72 |      40 |      48 |     84 |         58 |          68 | Mejora en centros y choques                              |
| Ariel “El Leñero”  | Comodín       |     48 |      72 |      45 |     86 |         52 |          70 | Roba más, pero aumenta riesgo de falta                   |

---

## 7. Estadísticas de jugadores

Cada jugador tendrá seis estadísticas principales.

| Stat        | Descripción                                                |
| ----------- | ---------------------------------------------------------- |
| Ataque      | Remate, definición, desmarque y peligro ofensivo           |
| Defensa     | Marca, robo, bloqueo y anticipación defensiva              |
| Técnica     | Pase, control, regate y precisión                          |
| Físico      | Choque, fuerza, velocidad física y resistencia al contacto |
| Mentalidad  | Rendimiento bajo presión, penales, remontadas y errores    |
| Resistencia | Capacidad para mantener rendimiento durante el partido     |

### Uso de estadísticas por situación

| Situación         | Stats más importantes                               |
| ----------------- | --------------------------------------------------- |
| Pase filtrado     | Técnica + Ataque                                    |
| Regate individual | Técnica + Físico                                    |
| Centro al área    | Técnica + Ataque/Físico del receptor                |
| Tiro lejano       | Ataque + Técnica                                    |
| Presión alta      | Defensa + Físico + Resistencia                      |
| Bloque bajo       | Defensa + Mentalidad                                |
| Barrida fuerte    | Defensa + Físico                                    |
| Línea adelantada  | Defensa + Mentalidad                                |
| Penal             | Ataque/Mentalidad vs Defensa/Mentalidad del portero |

---

## 8. Cartas iniciales

El MVP tendrá un paquete inicial de 20 cartas.

### Distribución

| Tipo        | Cantidad |
| ----------- | -------: |
| Ataque      |        6 |
| Defensa     |        6 |
| Medio campo |        4 |
| Especiales  |        4 |

---

## 8.1 Cartas de ataque

### 1. Pase filtrado

* Tipo: ataque.
* Poder base: 72.
* Riesgo: 45.
* Costo de energía: 12.
* Fuerte contra: bloque bajo, defensa lenta.
* Débil contra: línea adelantada, anticipación.
* Stats relevantes: técnica + ataque.
* Resultados posibles: mano a mano, pase interceptado, fuera de juego, ocasión clara.

### 2. Regate individual

* Tipo: ataque.
* Poder base: 70.
* Riesgo: 55.
* Costo de energía: 14.
* Fuerte contra: marca pasiva, bloque bajo.
* Débil contra: barrida fuerte, doble marca.
* Stats relevantes: técnica + físico.
* Resultados posibles: supera rival, falta recibida, pérdida, lesión leve, tiro.

### 3. Centro al área

* Tipo: ataque.
* Poder base: 66.
* Riesgo: 35.
* Costo de energía: 10.
* Fuerte contra: defensa baja sin juego aéreo.
* Débil contra: marca aérea, portero dominante.
* Stats relevantes: técnica del asistidor + ataque/físico del receptor.
* Resultados posibles: remate, despeje, córner, gol.

### 4. Tiro lejano

* Tipo: ataque.
* Poder base: 62.
* Riesgo: 60.
* Costo de energía: 9.
* Fuerte contra: defensa encerrada, portero mal ubicado.
* Débil contra: tapar disparo, portero atento.
* Stats relevantes: ataque + técnica.
* Resultados posibles: golazo, atajada, bloqueo, tiro desviado.

### 5. Pared rápida

* Tipo: ataque.
* Poder base: 68.
* Riesgo: 40.
* Costo de energía: 11.
* Fuerte contra: defensa lenta, presión desordenada.
* Débil contra: anticipación, marca al hombre.
* Stats relevantes: técnica + química del equipo.
* Resultados posibles: ocasión clara, pérdida, pase cortado, tiro.

### 6. Tiro colocado

* Tipo: ataque.
* Poder base: 65.
* Riesgo: 38.
* Costo de energía: 10.
* Fuerte contra: porteros físicos pero lentos.
* Débil contra: portero atento, tapar disparo.
* Stats relevantes: ataque + mentalidad.
* Resultados posibles: gol, atajada, tiro desviado, rebote.

---

## 8.2 Cartas defensivas

### 7. Presión alta

* Tipo: defensa.
* Poder base: 70.
* Riesgo: 50.
* Costo de energía: 15.
* Fuerte contra: toque corto, pausa y control.
* Débil contra: pelotazo, pase filtrado rápido.
* Stats relevantes: defensa + físico + resistencia.
* Resultados posibles: robo, falta, desgaste, rival supera presión.

### 8. Bloque bajo

* Tipo: defensa.
* Poder base: 68.
* Riesgo: 25.
* Costo de energía: 8.
* Fuerte contra: regate, tiro colocado, ataque directo.
* Débil contra: tiro lejano, centro al área.
* Stats relevantes: defensa + mentalidad.
* Resultados posibles: bloqueo, despeje, concede córner, absorbe presión.

### 9. Barrida fuerte

* Tipo: defensa.
* Poder base: 74.
* Riesgo: 65.
* Costo de energía: 12.
* Fuerte contra: regate individual, contraataque.
* Débil contra: provocar falta, pared rápida.
* Stats relevantes: defensa + físico.
* Resultados posibles: robo limpio, falta, tarjeta, rival supera.

### 10. Línea adelantada

* Tipo: defensa.
* Poder base: 66.
* Riesgo: 52.
* Costo de energía: 10.
* Fuerte contra: pase filtrado, ataque directo.
* Débil contra: regate, tiro lejano, pared rápida si hay buena técnica.
* Stats relevantes: defensa + mentalidad.
* Resultados posibles: fuera de juego, mano a mano rival, pase cortado.

### 11. Marcar al hombre

* Tipo: defensa.
* Poder base: 64.
* Riesgo: 30.
* Costo de energía: 9.
* Fuerte contra: inspiración del crack, pared rápida, tiro colocado.
* Débil contra: cambio de banda, toque colectivo.
* Stats relevantes: defensa + físico.
* Resultados posibles: reduce peligro, falta leve, pierde marca.

### 12. Anticipación

* Tipo: defensa.
* Poder base: 67.
* Riesgo: 42.
* Costo de energía: 10.
* Fuerte contra: pase filtrado, pared rápida, toque corto.
* Débil contra: regate individual, tiro lejano.
* Stats relevantes: defensa + mentalidad + técnica.
* Resultados posibles: robo, intercepción, error de lectura, contraataque.

---

## 8.3 Cartas de medio campo

### 13. Toque corto

* Tipo: medio campo.
* Poder base: 63.
* Riesgo: 28.
* Costo de energía: 7.
* Fuerte contra: bloque bajo, defensa desordenada.
* Débil contra: presión alta.
* Stats relevantes: técnica + química.
* Resultados posibles: mantiene posesión, avanza jugada, pérdida bajo presión.

### 14. Cambio de banda

* Tipo: medio campo.
* Poder base: 61.
* Riesgo: 35.
* Costo de energía: 8.
* Fuerte contra: marcar al hombre, bloque cerrado.
* Débil contra: anticipación, presión alta.
* Stats relevantes: técnica + mentalidad.
* Resultados posibles: ventaja por banda, pase largo fallido, centro posterior.

### 15. Pelotazo

* Tipo: medio campo.
* Poder base: 58.
* Riesgo: 48.
* Costo de energía: 6.
* Fuerte contra: presión alta, línea defensiva adelantada mal ejecutada.
* Débil contra: bloque bajo, defensa física.
* Stats relevantes: físico + ataque del receptor.
* Resultados posibles: segunda pelota, pérdida, ocasión directa, choque.

### 16. Pausa y control

* Tipo: medio campo.
* Poder base: 60.
* Riesgo: 25.
* Costo de energía: 6.
* Fuerte contra: rival cansado, partido caótico.
* Débil contra: presión alta.
* Stats relevantes: técnica + mentalidad.
* Resultados posibles: baja ritmo, recupera energía ligera, mantiene posesión, pérdida peligrosa.

---

## 8.4 Cartas especiales

### 17. Última jugada

* Tipo: especial.
* Poder base: variable.
* Riesgo: 45.
* Costo de energía: 12.
* Condición: solo disponible en los últimos dos momentos.
* Efecto: aumenta el poder ofensivo si el equipo está empatando o perdiendo.
* Riesgo: si falla, baja mucho el momentum.

### 18. La hinchada empuja

* Tipo: especial.
* Poder base: variable.
* Riesgo: 20.
* Costo de energía: 5.
* Condición: usable una vez por partido.
* Efecto: aumenta momentum y mentalidad temporalmente.
* Riesgo: bajo impacto si el equipo va perdiendo por mucha diferencia.

### 19. Todo o nada

* Tipo: especial.
* Poder base: alto.
* Riesgo: 75.
* Costo de energía: 18.
* Condición: usable cuando quedan tres momentos o menos.
* Efecto: aumenta fuerte el ataque.
* Riesgo: si falla, deja al equipo expuesto y puede generar contraataque rival.

### 20. Enfriar el partido

* Tipo: especial.
* Poder base: defensivo.
* Riesgo: 30.
* Costo de energía: 7.
* Condición: más útil cuando el equipo va ganando.
* Efecto: reduce ritmo y probabilidad de ocasiones peligrosas.
* Riesgo: puede ceder momentum al rival.

---

## 9. Situaciones de partido

El motor debe generar una situación por momento clave.

### Situaciones iniciales

| ID             | Situación               | Tipo dominante  | Cartas recomendadas                 |
| -------------- | ----------------------- | --------------- | ----------------------------------- |
| ataque_banda   | Ataque por banda        | Ataque          | Centro, regate, cambio de banda     |
| ataque_centro  | Ataque por el centro    | Ataque          | Pase filtrado, pared, tiro lejano   |
| contraataque   | Contraataque            | Ataque rápido   | Pase filtrado, pelotazo, regate     |
| posesion_media | Posesión en medio campo | Medio campo     | Toque corto, pausa, cambio de banda |
| presion_rival  | El rival presiona       | Defensa/medio   | Pausa, pelotazo, toque corto        |
| tiro_libre     | Tiro libre peligroso    | Ataque especial | Tiro colocado, centro, tiro lejano  |
| corner         | Córner                  | Ataque aéreo    | Centro, jugada preparada            |
| ultima_jugada  | Última jugada           | Especial        | Última jugada, todo o nada          |

### Selección de situaciones

Para el MVP, las situaciones pueden generarse de forma semialeatoria, pero controlada.

Reglas sugeridas:

* No repetir la misma situación más de dos veces por partido.
* Incluir al menos una situación ofensiva para cada equipo.
* Reservar “última jugada” para el momento 8.
* Aumentar probabilidad de situaciones ofensivas para quien tenga más momentum.
* Aumentar probabilidad de situaciones defensivas si el equipo tiene poca energía.

---

## 10. Flujo de una jugada

Cada jugada sigue este flujo:

1. Se muestra el minuto.
2. Se muestra la situación.
3. Se identifica el jugador protagonista del equipo del usuario.
4. Se muestran 4 cartas disponibles.
5. El usuario elige una carta.
6. La IA selecciona una carta rival.
7. Se revelan ambas cartas.
8. Se calcula la resolución.
9. Se muestra una animación simple.
10. Se actualizan marcador, energía y momentum.
11. Se muestra narración.
12. Se registra la jugada en el historial.
13. Se habilita el botón para continuar.

---

## 11. IA rival del MVP

La IA no necesita ser avanzada.

### Nivel inicial

La IA puede elegir cartas con reglas simples:

* Si el jugador usa muchas cartas de ataque, la IA prioriza defensa.
* Si la IA va perdiendo, aumenta probabilidad de cartas agresivas.
* Si la IA va ganando, aumenta probabilidad de cartas defensivas.
* Si tiene poca energía, evita cartas muy costosas.
* En últimas jugadas, puede usar cartas especiales.

### Comportamiento esperado

La IA debe sentirse básica, pero no completamente aleatoria.

Debe dar la impresión de que responde al contexto del partido.

---

## 12. Sistema de energía

Para el MVP, se recomienda usar **energía por equipo** y no por jugador individual.

Esto simplifica la primera versión.

### Energía inicial

Cada equipo inicia con 100 puntos de energía.

### Consumo

Cada carta consume energía.

Ejemplo:

| Tipo de carta | Costo aproximado |
| ------------- | ---------------: |
| Conservadora  |            5 a 8 |
| Normal        |           9 a 12 |
| Intensa       |          13 a 16 |
| Extrema       |          17 a 20 |

### Efectos de baja energía

| Energía restante | Efecto                                    |
| ---------------- | ----------------------------------------- |
| 70 a 100         | Sin penalización                          |
| 40 a 69          | Penalización leve en cartas intensas      |
| 20 a 39          | Penalización media en precisión y defensa |
| 0 a 19           | Penalización alta, más errores y lesiones |

### Recuperación

Algunas cartas pueden recuperar o conservar energía:

* Pausa y control: recupera 3 energía si tiene éxito.
* Enfriar el partido: reduce desgaste en la siguiente jugada.
* Bloque bajo: consume poca energía.

---

## 13. Sistema de momentum

Cada equipo tendrá momentum de 0 a 100.

### Valor inicial

Ambos equipos inician con 50.

### Momentum alto

Cuando un equipo tiene momentum alto:

* Mejora ligeramente la probabilidad de éxito.
* Aumenta impacto de cartas especiales.
* Mejora mentalidad en jugadas decisivas.

### Momentum bajo

Cuando un equipo tiene momentum bajo:

* Aumenta probabilidad de errores.
* Baja impacto de cartas arriesgadas.
* Penaliza jugadas bajo presión.

### Cambios típicos

| Evento                   | Cambio de momentum |
| ------------------------ | -----------------: |
| Gol anotado              |                +18 |
| Gol recibido             |                -15 |
| Ocasión clara generada   |                 +8 |
| Ocasión clara fallada    |                 -6 |
| Robo exitoso             |                 +6 |
| Falta peligrosa cometida |                 -8 |
| Atajada importante       |                +10 |
| Carta especial exitosa   |                +10 |
| Todo o nada fallido      |                -15 |

---

## 14. Sistema de resolución de jugadas

El motor debe calcular un puntaje de acción para cada jugada.

### Fórmula conceptual inicial

```txt
puntaje = poderCarta
        + modificadorStats
        + modificadorCounter
        + modificadorEnergia
        + modificadorMomentum
        + modificadorSituacion
        + azarControlado
        - riesgo
```

### Componentes

#### Poder de carta

Valor base de la carta.

#### Modificador de stats

Se calcula según los atributos relevantes de los jugadores involucrados.

#### Modificador de counter

Bonificación o penalización según la interacción entre carta atacante y carta defensiva.

Ejemplo:

* Pase filtrado vs línea adelantada: defensa gana ventaja.
* Regate individual vs barrida fuerte: alto riesgo para ambos.
* Tiro lejano vs bloque bajo: atacante gana ligera ventaja.
* Centro al área vs marca aérea: defensa gana ventaja.

#### Modificador de energía

Penaliza acciones si el equipo está cansado.

#### Modificador de momentum

Pequeña bonificación o penalización según el estado emocional del partido.

#### Modificador de situación

Algunas cartas tienen más sentido en ciertas situaciones.

#### Azar controlado

Rango aleatorio pequeño para que el partido no sea completamente predecible.

Recomendación inicial:

```txt
azarControlado = número aleatorio entre -8 y +8
```

#### Riesgo

El riesgo no siempre debe restarse directamente. Puede afectar la severidad del fallo.

Ejemplo:

* Carta de bajo riesgo falla: pérdida simple.
* Carta de alto riesgo falla: contraataque, falta, tarjeta o gol rival.

---

## 15. Resultados posibles

### Resultados ofensivos

* Gol.
* Tiro al arco.
* Tiro desviado.
* Atajada.
* Rebote.
* Córner.
* Ocasión clara.
* Mano a mano.
* Fuera de juego.
* Pérdida de balón.

### Resultados defensivos

* Robo limpio.
* Intercepción.
* Bloqueo.
* Despeje.
* Falta.
* Tarjeta amarilla.
* Penal cometido.
* Defensa superada.

### Resultados neutros

* Mantiene posesión.
* Avanza metros.
* Baja ritmo.
* Se consume tiempo.
* Ambos equipos pierden energía.

---

## 16. Sistema de goles

No toda jugada exitosa debe terminar en gol.

El sistema puede tener niveles:

1. Acción fallida.
2. Acción neutral.
3. Acción positiva.
4. Ocasión clara.
5. Tiro al arco.
6. Gol.

### Ejemplo de umbrales iniciales

| Puntaje final | Resultado base           |
| ------------: | ------------------------ |
|        0 a 35 | Fallo claro              |
|       36 a 50 | Resultado neutral        |
|       51 a 65 | Avance o ventaja         |
|       66 a 78 | Ocasión clara            |
|       79 a 88 | Tiro al arco peligroso   |
|      89 o más | Alta probabilidad de gol |

Después de llegar a “alta probabilidad de gol”, se puede hacer una segunda validación contra el portero.

### Resolución contra portero

```txt
probabilidadGol = puntajeAtaque - defensaPortero + modificadores
```

Para el MVP, esta validación puede mantenerse simple.

---

## 17. Narración

La narración es clave para que el partido tenga personalidad.

Cada resultado debe generar un texto corto, claro y con sabor futbolero.

### Ejemplos

#### Gol

> Leo “El Crack” recibió con espacio, levantó la cabeza y la puso pegada al palo. ¡Golazo de Los del Parque!

#### Atajada

> El remate llevaba veneno, pero Rolo “Manos Duras” metió una mano firme y salvó a Cemento FC.

#### Robo defensivo

> Chino “El Muro” leyó la jugada desde antes. Se cruzó fuerte y cortó el avance sin complicarse.

#### Falta

> Ariel “El Leñero” fue con todo. Tocó pelota, pierna y casi hasta la gradería. El árbitro no la dejó pasar.

#### Fuera de juego

> El pase parecía perfecto, pero la defensa tiró la línea justo a tiempo. Fuera de juego.

#### Fallo ofensivo

> La idea era buena, pero la ejecución no. La pelota terminó más cerca del parqueo que del arco.

### Reglas de narración

* Debe explicar qué pasó.
* Debe mencionar jugadores cuando sea posible.
* Debe reforzar el tono del juego.
* No debe ser demasiado larga.
* Debe variar para no sentirse repetitiva.

---

## 18. Interfaz del MVP

### Pantallas necesarias

1. Pantalla de inicio del MVP.
2. Selección de equipo.
3. Vista previa de equipos.
4. Pantalla de partido.
5. Resumen final.

### Pantalla de inicio

Debe mostrar:

* Nombre provisional del juego.
* Botón “Jugar partido rápido”.
* Breve descripción del MVP.

### Selección de equipo

Debe mostrar:

* Los equipos disponibles.
* Estilo de cada equipo.
* Plantilla resumida.
* Fortalezas y debilidades.
* Botón para elegir equipo.

### Pantalla de partido

Debe mostrar:

* Marcador.
* Minuto actual.
* Nombre de ambos equipos.
* Momentum de ambos equipos.
* Energía de ambos equipos.
* Situación actual.
* Jugador protagonista.
* Cartas disponibles.
* Carta elegida por el jugador.
* Carta elegida por la IA.
* Narración de la jugada.
* Botón “Siguiente jugada”.
* Historial breve.

### Resumen final

Debe mostrar:

* Resultado final.
* Ganador.
* Goles.
* Jugada destacada.
* Carta más usada.
* Momentum final.
* Energía final.
* Botón para jugar de nuevo.

---

## 19. Animaciones iniciales

Las animaciones deben ser simples y funcionales.

### Recomendadas para MVP

* Hover/selección de carta.
* Carta elegida se mueve al centro.
* Carta rival se revela.
* Pequeño choque visual entre cartas.
* Barra de energía cambia suavemente.
* Barra de momentum cambia suavemente.
* Efecto visual de gol.
* Efecto visual de atajada.
* Texto de narración aparece con transición.

### No recomendadas todavía

* Jugadores animados en cancha completa.
* Balón con físicas reales.
* Cinemáticas complejas.
* Render 3D.
* Canvas avanzado.
* Animaciones muy largas que hagan lento el partido.

---

## 20. Modelo de datos inicial

### Player

```ts
type PlayerRole = "goalkeeper" | "defender" | "midfielder" | "forward" | "utility";

type Player = {
  id: string;
  name: string;
  nickname: string;
  role: PlayerRole;
  attack: number;
  defense: number;
  technique: number;
  physical: number;
  mentality: number;
  stamina: number;
  trait: string;
};
```

### Team

```ts
type TeamStyle = "balanced" | "physical" | "technical" | "fast" | "defensive" | "chaotic";

type Team = {
  id: string;
  name: string;
  style: TeamStyle;
  description: string;
  strengths: string[];
  weaknesses: string[];
  players: Player[];
};
```

### TacticalCard

```ts
type CardType = "attack" | "defense" | "midfield" | "special";

type TacticalCard = {
  id: string;
  name: string;
  type: CardType;
  description: string;
  basePower: number;
  risk: number;
  energyCost: number;
  strongAgainst: string[];
  weakAgainst: string[];
  preferredSituations: string[];
};
```

### MatchSituation

```ts
type MatchSituation = {
  id: string;
  minute: number;
  title: string;
  description: string;
  type: "attack" | "defense" | "midfield" | "set_piece" | "special";
  preferredCardTypes: CardType[];
};
```

### MatchState

```ts
type MatchState = {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  currentMomentIndex: number;
  totalMoments: number;
  homeEnergy: number;
  awayEnergy: number;
  homeMomentum: number;
  awayMomentum: number;
  history: MatchEvent[];
  status: "not_started" | "in_progress" | "finished";
};
```

### MatchEvent

```ts
type MatchEvent = {
  id: string;
  minute: number;
  situationId: string;
  playerCardId: string;
  rivalCardId: string;
  outcome: PlayOutcome;
  narration: string;
  homeScore: number;
  awayScore: number;
  homeEnergy: number;
  awayEnergy: number;
  homeMomentum: number;
  awayMomentum: number;
};
```

### PlayOutcome

```ts
type PlayOutcome =
  | "goal"
  | "shot_saved"
  | "shot_missed"
  | "blocked"
  | "corner"
  | "foul"
  | "yellow_card"
  | "penalty"
  | "offside"
  | "turnover"
  | "interception"
  | "possession_kept"
  | "chance_created"
  | "neutral";
```

---

## 21. Funciones principales del motor

### Función para iniciar partido

```ts
startMatch(playerTeam: Team, rivalTeam: Team): MatchState
```

Debe crear el estado inicial del partido.

### Función para generar situación

```ts
getNextSituation(matchState: MatchState): MatchSituation
```

Debe devolver la siguiente situación del partido.

### Función para obtener cartas disponibles

```ts
getAvailableCards(hand: TacticalCard[], situation: MatchSituation): TacticalCard[]
```

Debe devolver cartas jugables para ese momento.

### Función de IA

```ts
chooseAiCard(params: {
  situation: MatchSituation;
  availableCards: TacticalCard[];
  matchState: MatchState;
}): TacticalCard
```

Debe seleccionar una carta rival.

### Función de resolución

```ts
resolvePlay(params: {
  matchState: MatchState;
  situation: MatchSituation;
  playerCard: TacticalCard;
  rivalCard: TacticalCard;
  playerTeam: Team;
  rivalTeam: Team;
}): MatchEvent
```

Debe resolver la jugada y devolver un evento de partido.

### Función para aplicar resultado

```ts
applyMatchEvent(matchState: MatchState, event: MatchEvent): MatchState
```

Debe actualizar marcador, energía, momentum e historial.

---

## 22. Criterios de éxito del MVP

El MVP se considera exitoso si cumple estas condiciones:

### Jugabilidad

* El jugador entiende rápidamente qué debe hacer.
* Elegir cartas se siente relevante.
* Las situaciones tienen sentido futbolero.
* El partido se puede completar sin confusión.
* El resultado final se siente razonable.

### Diversión

* El usuario quiere jugar otro partido.
* Hay tensión en las últimas jugadas.
* Las cartas generan decisiones reales.
* El momentum se siente útil.
* La energía obliga a pensar.

### Claridad

* El jugador entiende por qué una jugada funcionó o falló.
* La narración ayuda a explicar la resolución.
* Las barras y el marcador son fáciles de leer.
* Las cartas son legibles.

### Técnica

* La lógica de juego está separada de la interfaz.
* El motor puede probarse sin UI.
* Los datos de cartas/equipos están centralizados.
* No hay dependencia de backend para el MVP.
* El código permite agregar más equipos, cartas y situaciones después.

---

## 23. Riesgos del MVP

### 23.1 Que el partido se sienta demasiado aleatorio

Solución:

* Reducir el azar.
* Explicar mejor los counters.
* Dar más peso a cartas y stats.

### 23.2 Que siempre haya una carta claramente mejor

Solución:

* Ajustar costos de energía.
* Aumentar riesgos.
* Crear counters más claros.

### 23.3 Que el jugador no entienda qué pasó

Solución:

* Mejorar narración.
* Mostrar indicadores simples de ventaja/desventaja.
* Mostrar por qué una carta era fuerte o débil en esa situación.

### 23.4 Que el partido sea lento

Solución:

* Reducir cantidad de momentos.
* Acortar animaciones.
* Simplificar textos.
* Agregar botón rápido para continuar.

### 23.5 Que falte emoción

Solución:

* Aumentar impacto de últimas jugadas.
* Mejorar efectos de gol y atajada.
* Usar momentum para crear remontadas.
* Agregar eventos decisivos.

---

## 24. Orden de desarrollo recomendado

### Paso 1: Datos estáticos

Crear:

* Tipos.
* Equipos.
* Jugadores.
* Cartas.
* Situaciones.

### Paso 2: Motor de juego

Crear:

* Inicio de partido.
* Generador de situaciones.
* Selector de carta IA.
* Resolución de jugadas.
* Aplicación de resultados.
* Narración.

### Paso 3: Pantalla básica de partido

Crear:

* Marcador.
* Energía.
* Momentum.
* Situación actual.
* Mano de cartas.
* Resultado.
* Historial.

### Paso 4: Flujo completo

Conectar:

* Selección de equipo.
* Inicio de partido.
* Jugar momentos.
* Finalizar partido.
* Resumen final.

### Paso 5: Pulido visual

Agregar:

* Animaciones de cartas.
* Barras animadas.
* Efectos de gol.
* Mejoras de layout.
* Responsividad.

### Paso 6: Balance inicial

Ajustar:

* Poder de cartas.
* Riesgo.
* Costo de energía.
* Impacto de momentum.
* Frecuencia de goles.
* Severidad de fallos.

---

## 25. Archivos iniciales sugeridos

```txt
src/
  app/
    page.tsx
    match/
      page.tsx

  components/
    match/
      MatchScreen.tsx
      Scoreboard.tsx
      EnergyBar.tsx
      MomentumBar.tsx
      SituationPanel.tsx
      CardHand.tsx
      TacticalCardView.tsx
      PlayResolutionPanel.tsx
      MatchHistory.tsx
      FinalSummary.tsx

    team/
      TeamSelect.tsx
      TeamPreview.tsx
      PlayerList.tsx

  lib/
    game/
      types.ts
      teams.ts
      players.ts
      cards.ts
      situations.ts
      match-engine.ts
      resolver.ts
      ai.ts
      narration.ts
      balance.ts
      utils.ts
```

---

## 26. Decisiones pendientes antes de código

Antes de programar, conviene definir:

1. Nombre definitivo o nombre temporal del repositorio.
2. Si se usará Next.js desde el inicio o Vite para prototipo rápido.
3. Si el MVP será solo frontend local.
4. Si se usarán imágenes reales, íconos o solo diseño con CSS.
5. Si las cartas tendrán ilustraciones desde el inicio.
6. Si se usará Tailwind.
7. Si se usará una librería de animación o solo CSS.
8. Si el tono visual será urbano, caricaturesco, minimalista o tipo carta deportiva.
9. Si el partido se jugará desde la perspectiva de local/visitante o usuario/rival.
10. Si el MVP tendrá soporte móvil desde el primer prototipo.

---

## 27. Recomendación técnica para este MVP

Para la primera versión jugable, se recomienda:

* Frontend local.
* Sin backend.
* Sin Supabase todavía.
* TypeScript estricto.
* Datos mock en archivos `.ts`.
* Motor de juego puro en TypeScript.
* Interfaz en React.
* Estilos con Tailwind.
* Animaciones simples con CSS.

Esto permite validar el gameplay antes de comprometerse con base de datos, autenticación o multijugador.

---

## 28. Conclusión

El MVP 1 debe enfocarse exclusivamente en lograr que el partido sea divertido.

No debe intentar parecerse a un juego de fútbol tradicional. Su identidad está en tomar decisiones tácticas durante momentos clave, administrar energía, aprovechar momentum, leer al rival y vivir pequeñas historias dentro de cada jugada.

La prioridad técnica es construir un motor limpio y una interfaz clara. La prioridad de diseño es que el jugador entienda qué está pasando y quiera jugar otro partido.

Cuando este MVP funcione, el siguiente paso natural será agregar progresión simple: recompensas, XP, desbloqueo de cartas, mejoras de jugadores y un torneo corto.