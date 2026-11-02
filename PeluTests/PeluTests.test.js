import { describe, test, expect } from 'vitest'
 
/*
 Pruebas unitarias para Pastel Plushes (PeluJavas)
 */
function validarRegistroPrueba(nombre, correo, contrasena, contrasenaConf) {
  const vLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const vCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let errores = [];
 
  if (!nombre || !vLetras.test(nombre)) errores.push('nombre');
  if (!contrasena) errores.push('contrasena');
  if (!contrasenaConf || contrasenaConf !== contrasena) errores.push('contrasenaConf');
  if (!correo || !vCorreo.test(correo)) errores.push('correo');
 
  return { valido: errores.length === 0, errores: errores };
}
 
describe('Pruebas Unitarias - Validación de Formulario (PeluJavas)', () => {
  test('Caso 1: Todo bien (datos correctos)', () => {
    const res = validarRegistroPrueba('Pedro Perez', 'pedro@plushe.cl', 'pepito15', 'pepito15');
    expect(res.valido).toBe(true);
    expect(res.errores.length).toBe(0);
  });
 
  test('Caso 2: Falla solo una cosa (nombre inválido)', () => {
    const res = validarRegistroPrueba('Pedro123', 'pedro@plushe.cl', 'pepito15', 'pepito15');
    expect(res.valido).toBe(false);
    expect(res.errores.length).toBe(1);
    expect(res.errores).toContain('nombre');
  });
 
  test('Caso 3: Fallan múltiples cosas (nombre y correo inválidos)', () => {
    const res = validarRegistroPrueba('Pedro123', 'correo-malo', 'pepito15', 'pepito15');
    expect(res.valido).toBe(false);
    expect(res.errores.length).toBeGreaterThan(1);
    expect(res.errores).toContain('nombre');
    expect(res.errores).toContain('correo');
  });
});
 