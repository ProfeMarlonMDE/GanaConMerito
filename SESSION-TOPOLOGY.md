# SESSION-TOPOLOGY.md

## Objetivo

Definir la topología operativa de sesiones persistentes por rol para la agencia de desarrollo de GanaConMerito.

## Principio

Gauss es la capa de entrada, coordinación y consolidación.

Las sesiones especializadas existen para mantener contexto por dominio, reducir mezcla de temas y permitir ejecución o análisis enfocado.

## Sesión principal

### gauss-main

Rol:
- dirección general
- intake de objetivos
- priorización
- delegación
- consolidación de respuestas
- escalamiento hacia Marlon

Nota:
Gauss no compite con los especialistas. Los coordina.

## Sesiones persistentes recomendadas

### techlead-architecture

Enfoque:
- arquitectura
- decisiones transversales
- deuda estructural
- tradeoffs técnicos
- coherencia entre frontend, backend, datos e infraestructura

### frontend-product

Enfoque:
- interfaz
- experiencia de usuario
- flujos
- PWA
- accesibilidad
- responsive
- performance percibida

### backend-services

Enfoque:
- lógica de negocio
- servicios
- endpoints
- integraciones
- autenticación y autorización del lado servidor

### data-supabase

Enfoque:
- esquema de datos
- migraciones
- RLS
- integridad
- queries
- performance de acceso a datos

### qa-validation

Enfoque:
- pruebas funcionales
- regresiones
- edge cases
- criterios de aceptación
- pasos de reproducción

### infra-devops

Enfoque:
- Docker
- despliegues
- CI/CD
- observabilidad
- estabilidad operativa
- entornos
- secretos y configuración

## Sesión opcional

### editorial-content

Enfoque:
- contenido
- copy
- consistencia de tono
- estructura editorial

Crear solo si esa línea de trabajo realmente será recurrente.

## Flujo operativo recomendado

1. Marlon habla con Gauss
2. Gauss clasifica el problema
3. Gauss decide si responde o delega
4. Si delega, envía tarea a la sesión especializada adecuada
5. El especialista responde usando REPORT-FORMAT.md
6. Gauss consolida y devuelve respuesta ejecutiva

## Reglas de interacción

- Marlon no necesita operar los especialistas directamente
- Los especialistas no deben abrir estrategia de negocio por su cuenta
- Los especialistas deben mantenerse dentro de su dominio
- Los casos transversales deben escalar a Tech Lead o a Gauss
- Gauss decide el siguiente movimiento operativo

## Orden sugerido de creación

1. techlead-architecture
2. data-supabase
3. frontend-product
4. backend-services
5. qa-validation
6. infra-devops
7. editorial-content (opcional)

## Motivo del orden

- Tech Lead y Datos ayudan a ordenar arquitectura y modelo base
- Frontend y Backend cubren ejecución principal
- QA estabiliza entregas
- Infra cierra capacidad operativa y despliegue

## Convención de nombres

Usar nombres estables, explícitos y orientados a dominio.

Evitar nombres ambiguos como:
- agente-1
- dev-helper
- bot-general

Usar nombres como:
- techlead-architecture
- frontend-product
- backend-services
- data-supabase
- qa-validation
- infra-devops
