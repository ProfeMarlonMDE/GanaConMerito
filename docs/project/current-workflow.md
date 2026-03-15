# Current Workflow — idea a producción en GanaConMerito

## Objetivo
Definir un flujo operativo claro para pasar de idea a producción sin perder cambios ni mezclar fuentes de verdad.

---

## Flujo oficial recomendado

### 1. Diseñar
Lugar principal:
- Telegram + Ágora

Entregable:
- plan
- criterio
- checklist
- decisión arquitectónica

---

### 2. Implementar
Lugar principal:
- repo de trabajo controlado
- temporalmente: workspace o VPS si no existe repo local usable

Entregable:
- archivos modificados
- cambios verificables

---

### 3. Versionar
Lugar principal:
- Git

Entregable:
- commit limpio
- mensaje claro

---

### 4. Respaldar
Lugar principal:
- GitHub

Entregable:
- push al remoto
- confirmación de commit visible en remoto

---

### 5. Desplegar
Lugar principal:
- VPS

Entregable:
- build
- restart
- migraciones si aplican

---

### 6. Validar
Lugar principal:
- producción real
- logs
- health checks
- prueba funcional mínima

Entregable:
- confirmación de funcionamiento
- o lista de errores reales

---

## Regla de operación para cambios con base de datos
Si un cambio toca DB:
1. migración
2. código compatible
3. despliegue con DB
4. validación real

No aplicar solo una parte.

---

## Regla de operación para cambios solo frontend/backend app
Si no toca DB:
1. commit limpio
2. respaldo
3. deploy normal
4. validación funcional

---

## Regla de emergencia
Si el cambio solo existe en el VPS:
1. estabilizar producción
2. documentar lo aplicado
3. extraer cambios a repo versionado
4. subir a GitHub

---

## Estado ideal futuro
- repo local o controlado para desarrollo
- GitHub como canónico
- VPS solo como destino de despliegue
- docs siempre actualizados en repo

---

## Checklist mínimo por tarea
- [ ] decisión tomada
- [ ] archivos identificados
- [ ] entorno de ejecución identificado
- [ ] commit limpio creado
- [ ] respaldo en GitHub
- [ ] despliegue ejecutado
- [ ] validación real completada
