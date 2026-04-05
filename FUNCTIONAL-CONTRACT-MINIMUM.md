# FUNCTIONAL-CONTRACT-MINIMUM.md

## Propósito

Definir el mínimo funcional que debe existir antes de validar un flujo sensible.

Este archivo no reemplaza especificaciones grandes.
Sirve para evitar que QA, frontend, backend o Gauss trabajen sobre ambigüedad.

---

## Cuándo usarlo

Usarlo cuando el flujo tenga cualquiera de estas condiciones:
- autenticación
- permisos
- onboarding
- pagos
- acciones irreversibles
- estados de error sensibles
- pasos multi-etapa con riesgo de quedar “a medias”

---

## Mínimo obligatorio

### 1. Resultado esperado por etapa
Qué debe pasar en cada fase del flujo.

### 2. Estado visible esperado
Qué debe ver y entender el usuario en cada etapa.

### 3. Error esperado
Qué fallos esperables existen y cómo deben distinguirse.

### 4. Acción siguiente esperada
Qué debe poder hacer el usuario después de cada resultado.

### 5. Criterio de acceso
Quién sí puede avanzar, quién no y bajo qué condición.

### 6. Criterio de aceptación
Qué evidencia mínima permite decir que el flujo está bien.

---

## Plantilla mínima

### Flujo
Nombre corto del flujo.

### Etapas
- etapa 1: ...
- etapa 2: ...
- etapa 3: ...

### Resultado esperado por etapa
- etapa 1: ...
- etapa 2: ...
- etapa 3: ...

### Estado visible esperado
- etapa 1: ...
- etapa 2: ...
- etapa 3: ...

### Errores esperables
- error A: ...
- error B: ...
- error C: ...

### Acción siguiente esperada
- tras éxito: ...
- tras error recuperable: ...
- tras error no recuperable: ...

### Criterio de acceso
- permitido: ...
- denegado: ...

### Criterio de aceptación
- ...

---

## Ejemplo corto — magic link

### Flujo
Login con magic link

### Etapas
- solicitud del enlace
- apertura/validación del enlace
- acceso posterior al login

### Resultado esperado por etapa
- solicitud del enlace: sistema acepta la solicitud
- apertura/validación del enlace: sistema valida token/enlace
- acceso posterior al login: usuario entra con sesión y acceso coherente

### Estado visible esperado
- solicitud del enlace: mensaje claro de que revise su correo
- apertura/validación del enlace: estado verificando
- acceso posterior al login: confirmación de acceso o error claro

### Errores esperables
- enlace inválido
- enlace expirado
- enlace ya usado
- error interno
- acceso denegado tras login

### Acción siguiente esperada
- tras éxito: entrar al destino esperado
- tras error recuperable: solicitar nuevo enlace o reintentar
- tras error no recuperable: escalar o contactar soporte

### Criterio de acceso
- permitido: usuario autenticado con condición de acceso válida
- denegado: usuario sin condición de acceso válida o con restricción explícita

### Criterio de aceptación
- el usuario entiende qué pasó
- el sistema deja claro qué sigue
- QA puede distinguir auth, UI y permisos sin adivinar

---

## Regla final

Si un flujo sensible no tiene este mínimo, la agencia puede analizarlo, pero no debería darlo por validado con confianza.
