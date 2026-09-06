# Deuda Técnica y Plan de Homogeneización Visual

## 1. Deuda Técnica: Integración de Cargo/OPEC con el Banco de Preguntas (QB)

Actualmente, el selector de cargos en el perfil utiliza un catálogo canónico temporal (`src/lib/domain/positions.ts`) con códigos de OPEC pendientes (establecidos en `null`). Esta sección detalla la deuda técnica para su integración futura con el Banco de Preguntas V4.

1. **Dónde vive el catálogo canónico:**
   El catálogo de dominio está en `src/lib/domain/positions.ts`. En base de datos, los perfiles se cruzan con `target_profiles`, y en un futuro, con `opec_catalog`.
2. **Cómo gestionar cargos:**
   Para agregar, desactivar o modificar un cargo, se debe actualizar `CANONICAL_POSITIONS` en el frontend y reflejar la disponibilidad en la tabla `target_profiles` (y `opec_catalog` cuando aplique) vía migraciones.
3. **Cómo sustituir "OPEC pendiente":**
   Cuando se publiquen los códigos oficiales en SIMO, se deben insertar en `opec_catalog` y el frontend debe consumir estos IDs para mapearlos en el selector, actualizando `PositionOption` para reemplazar `null` por el UUID correspondiente.
4. **Identificadores estables:**
   El `targetProfileCode` (ej. `docente_aula_basica_primaria`) es estable y se usa como clave primaria lógica de dominio. Los nombres visibles son solo etiquetas.
5. **Migración de usuarios:**
   Si cambia una clasificación, se deberá ejecutar una migración en `learning_profiles` apuntando el `target_profile_code` obsoleto al nuevo, garantizando la preservación del historial de práctica.
6. **Relación cargo/OPEC con el banco de preguntas:**
   Las preguntas deberán tener metadata (`target_profile`) o mapearse a través de taxonomía V4 (`targeting`) para que el Tutor IA seleccione únicamente casos relevantes al cargo aspirado.
7. **Filtros requeridos:**
   Las queries de selección de ítems (ej. `/api/session/item`) deberán inyectar el `targetProfileCode` del usuario como filtro principal contra la metadata V4.
8. **Comportamiento ante escasez de preguntas:**
   Si un cargo no tiene suficientes ítems, el sistema deberá realizar un "fallback" a competencias transversales (ej. Lectura Crítica, Competencias Comportamentales Generales) y advertir al usuario.
9. **Evitar mezcla de cargos:**
   El motor de selección debe ser estricto con el filtro de perfil. Una pregunta de gestión directiva no debe presentarse a un docente de aula primaria, a menos que evalúe una competencia transversal explícitamente compartida.
10. **Pruebas de protección:**
    Se deben implementar tests de integración en `api/session/item` que afirmen que un `learning_profile` con cargo X nunca reciba ítems exclusivos del cargo Y.
11. **Decisiones pendientes:**
    - Cuándo se cargarán los OPECs oficiales.
    - Cuál será el umbral mínimo de preguntas por cargo para salir de Beta.

## 2. Plan de Homogeneización Visual

El Perfil se ha migrado a un nuevo lenguaje visual. Este plan guía la adopción global:

- **Inventario:**
  Páginas principales: `/login`, `/home`, `/practice`, `/dashboard`. Componentes compartidos: botones, tarjetas, modales.
- **Tokens Semánticos:**
  Implementar variables CSS globales definitivas (ej. `--gcm-forest`, `--gcm-lime`, `--gcm-surface-light`) para garantizar consistencia.
- **Componentes Reutilizables:**
  Crear componentes base (`Button`, `Card`, `Badge`) basados en el diseño del Perfil que absorban los estilos directos.
- **Fases de Adopción:**
  1. Refactorización de tokens en `globals.css`.
  2. Creación de la librería de componentes base.
  3. Migración de `/home` y `/dashboard`.
  4. Migración de `/practice` (crítico, requiere QA exhaustivo).
- **Preservación Estructural:**
  No se alterarán los flujos ni arquitecturas de la información. La refactorización es estrictamente visual y de presentación.
- **Rollback y Pruebas:**
  Toda vista migrada debe contar con visual QA y conservar sus tests E2E y de integración intactos.

