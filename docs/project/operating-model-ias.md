# Operating Model — uso de IAs en GanaConMerito

## Objetivo
Definir qué papel cumple cada IA o entorno conversacional para reducir duplicación, desorden y pérdidas de contexto.

---

## 1. Telegram + Ágora
### Rol
- arquitectura
- análisis
- revisión crítica
- orden del trabajo
- diagnóstico
- diseño de planes
- definición de prioridades

### Usos recomendados
- pensar antes de ejecutar
- revisar decisiones
- convertir caos en plan
- auditar propuestas de otras IAs

### No usar como flujo principal para
- dejar código vivo solo en conversación
- depender de respuestas sueltas como única memoria del proyecto

---

## 2. Google Antigravity / IA con acceso al VPS
### Rol
- ejecución real en servidor
- build
- restart
- logs
- systemd
- nginx
- Supabase CLI
- copias entre rutas
- validación del entorno vivo

### Usos recomendados
- comandos reales
- aplicar migraciones
- revisar servicios
- hacer despliegues
- verificar filesystem y procesos

### Riesgo
Si ejecuta cambios sin pasarlos luego al repo canónico, el VPS se convierte en una trampa de conocimiento.

---

## 3. Otras IAs de auditoría
### Rol
- segunda opinión
- auditoría técnica
- revisión de riesgos
- validación conceptual
- crítica de arquitectura

### Usos recomendados
- auditar decisiones importantes
- tensionar propuestas antes de implementar

### No usar para
- controlar el proyecto día a día
- reemplazar la fuente de verdad documental

---

## 4. Regla de especialización

### Ágora
- piensa
- ordena
- revisa
- decide

### IA con VPS
- ejecuta
- valida
- despliega
- inspecciona

### IA de auditoría
- cuestiona
- detecta riesgos
- propone ajustes

---

## 5. Regla de transferencia
Cuando una IA produce algo útil:
- debe transformarse en archivo o commit
- no debe quedarse solo en chat

---

## 6. Regla de coordinación
Antes de ejecutar una tarea importante, debe quedar claro:
- quién la hace
- en qué entorno
- cuál es el repo afectado
- qué archivo/documento será actualizado
- cuál será la validación final
