
import type { MpSdk } from 'embedtypes/sdk';
import { clearMesssage, connect, setMessage } from '../common';
import '../common/main.css';
import sourceDescs from './sources.json';
const main = async () => {
  const sdk: MpSdk = await connect({
    urlParams: {
      m: 'hXEV8zd9GFy',
      qs: '1',
      play: '1',
      title: '0',
    },
  });
  // 1. Buscador de coordenadas
  sdk.Pointer.intersection.subscribe((intersection) => {
    console.log("📍 COORDENADAS EXACTAS --->", intersection.position);
  });
  // 4. Etiqueta con Página Web (Portal Minverso)
  const [minversoSandboxId] = await sdk.Tag.registerSandbox(
    `<iframe src="https://minverso.com/" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"></iframe>`,
    {
      // Proporciones ajustadas según tu recuadro rojo (más ancho, manteniendo el formato vertical)
      size: { w: 600, h: 850 }
    }
  );
  sdk.Tag.add({
    label: "Portal Web Minverso",
    // Eliminé la 'description' para que la página web ocupe todo el espacio sin el recuadro negro abajo
    anchorPosition: {
      x: -16.836630782669214,
      y: 1.1608446625154798,
      z: 4.216808666955651
    },
    stemVector: { x: 0, y: 0, z: -0.3 },
    attachments: [minversoSandboxId]
  });



  // PASO 1
  const htmlChecklistPaso1 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #ffaa00; padding-bottom: 10px; font-size: 20px;">
      📋 Paso 1: Notificación y Autorización
    </h2>
    <p style="font-size: 13px; color: #cccccc; margin-bottom: 15px; font-style: italic;">
      Objetivo: Asegurar que el área sabe que el equipo se va a detener.
    </p>
    <form style="font-size: 14px; line-height: 1.5;">
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Identificar equipo:</strong> Confirmar visualmente el equipo a intervenir (ej. Molino SAC 3).
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Tomar equipo de comunicación:</strong> Interactuar con la radio en la mesa de inicio.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Contactar al encargado:</strong> Solicitar por radio la detención operativa del equipo.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Recibir autorización:</strong> Escuchar la confirmación de detención por parte del jefe de turno antes de avanzar.
      </label>
    </form>
  </div>
  `;
  const [checklistPaso1SandboxId] = await sdk.Tag.registerSandbox(htmlChecklistPaso1, { size: { w: 460, h: 380 } });
  sdk.Tag.add({
    label: "Paso 1: Notificación",
    anchorPosition: { x: -20.1439173752873, y: 1.405418092471173, z: 1.722705161011619 },
    stemVector: { x: 0.3, y: 0, z: 0 },
    color: { r: 1.0, g: 0.596, b: 0.0 }, // Orange
    iconId: 'public_characters_1',
    attachments: [checklistPaso1SandboxId]
  });
  // PASO 2
  const htmlChecklistPaso2 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #00aaff; padding-bottom: 10px; font-size: 20px;">
      📋 Paso 2: Identificación de Fuentes de Energía
    </h2>
    <p style="font-size: 13px; color: #cccccc; margin-bottom: 15px; font-style: italic;">
      Objetivo: Encontrar el punto exacto donde se debe cortar la energía.
    </p>
    <form style="font-size: 14px; line-height: 1.5;">
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Navegar a la sala eléctrica:</strong> Dirigirse al área de tableros.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Localizar tablero general:</strong> Identificar el panel principal que alimenta el equipo.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Ubicar el interruptor específico:</strong> Leer las etiquetas del tablero para encontrar la palanca exacta que corresponde al equipo a intervenir.
      </label>
    </form>
  </div>
  `;
  const [checklistPaso2SandboxId] = await sdk.Tag.registerSandbox(htmlChecklistPaso2, { size: { w: 460, h: 360 } });
  sdk.Tag.add({
    label: "Paso 2: Identificación",
    anchorPosition: { x: -18.9632054059643, y: 1.230397616938383, z: -2.285493963118637 },
    stemVector: { x: 0, y: 0, z: 0.3 },
    color: { r: 0.012, g: 0.663, b: 0.957 }, // Light Blue
    iconId: 'public_characters_2',
    attachments: [checklistPaso2SandboxId]
  });
  // PASO 3
  const htmlChecklistPaso3 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #ff4444; padding-bottom: 10px; font-size: 20px;">
      📋 Paso 3: Aislamiento
    </h2>
    <p style="font-size: 13px; color: #cccccc; margin-bottom: 15px; font-style: italic;">
      Objetivo: Cortar físicamente el flujo de energía.
    </p>
    <form style="font-size: 14px; line-height: 1.5;">
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Posicionamiento:</strong> Situarse frente al interruptor identificado en el paso anterior.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Accionar mecanismo:</strong> Bajar la palanca o girar el interruptor a la posición de apagado ("OFF").
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Confirmación sensorial:</strong> Validar el corte mediante el feedback visual (luces apagadas) y auditivo (sonido del corte).
      </label>
    </form>
  </div>
  `;
  const [checklistPaso3SandboxId] = await sdk.Tag.registerSandbox(htmlChecklistPaso3, { size: { w: 460, h: 360 } });
  sdk.Tag.add({
    label: "Paso 3: Aislamiento",
    anchorPosition: { x: -18.034426838887985, y: 1.222983537795993, z: -2.281127506949742 },
    stemVector: { x: 0, y: 0, z: 0.3 },
    color: { r: 0.957, g: 0.263, b: 0.212 }, // Red
    iconId: 'public_characters_3',
    attachments: [checklistPaso3SandboxId]
  });
  // PASO 4
  const htmlChecklistPaso4 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #f1c40f; padding-bottom: 10px; font-size: 20px;">
      📋 Paso 4: Recolección y Dispositivos de Bloqueo
    </h2>
    <p style="font-size: 13px; color: #cccccc; margin-bottom: 15px; font-style: italic;">
      Objetivo: Obtener las herramientas personales de seguridad.
    </p>
    <form style="font-size: 14px; line-height: 1.5;">
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Ir a la estación de bloqueo:</strong> Desplazarse hacia la caja de seguridad amarilla (SafeLockout).
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Tomar pinza múltiple (hasp):</strong> Retirar la pinza de la caja.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Tomar candado personal:</strong> Retirar el candado asignado al trabajador.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Tomar tarjeta de peligro:</strong> Retirar la etiqueta y confirmar que los datos (nombre, fecha, motivo) estén visibles.
      </label>
    </form>
  </div>
  `;
  const [checklistPaso4SandboxId] = await sdk.Tag.registerSandbox(htmlChecklistPaso4, { size: { w: 460, h: 400 } });
  sdk.Tag.add({
    label: "Paso 4: Recolección y Etiquetas",
    anchorPosition: { x: -12.623932290521346, y: 0.867121838449943, z: -2.625850974736056 },
    stemVector: { x: -0.3, y: 0, z: 0 },
    color: { r: 0.945, g: 0.769, b: 0.059 }, // Yellow
    iconId: 'public_characters_4',
    attachments: [checklistPaso4SandboxId]
  });
  // PASO 5
  const htmlChecklistPaso5 = `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: white; height: 100%; box-sizing: border-box;">
    <h2 style="margin-top: 0; border-bottom: 2px solid #2ecc71; padding-bottom: 10px; font-size: 20px;">
      📋 Paso 5: Bloqueo y Etiquetado
    </h2>
    <p style="font-size: 13px; color: #cccccc; margin-bottom: 15px; font-style: italic;">
      Objetivo: Bloquear físicamente el interruptor para que nadie pueda encenderlo por error.
    </p>
    <form style="font-size: 14px; line-height: 1.5;">
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Regresar al punto de corte:</strong> Volver al tablero aislado en el Paso 3.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Instalar pinza:</strong> Colocar la pinza en los orificios de bloqueo de la palanca.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Instalar candado:</strong> Insertar el candado cerrando la pinza.
      </label>
      <label style="display: block; margin-bottom: 10px; cursor: pointer;">
        <input type="checkbox" style="transform: scale(1.2); margin-right: 8px; vertical-align: middle;"> 
        <strong>Instalar tarjeta:</strong> Enganchar la tarjeta de advertencia de "PELIGRO" junto al candado.
      </label>
    </form>
  </div>
  `;
  const [checklistPaso5SandboxId] = await sdk.Tag.registerSandbox(htmlChecklistPaso5, { size: { w: 460, h: 380 } });
  sdk.Tag.add({
    label: "Paso 5: Bloqueo y Etiquetado",
    anchorPosition: { x: -17.48982384704301, y: 1.2687677861740818, z: -2.3042635948142762 },
    stemVector: { x: 0, y: 0, z: 0.3 },
    color: { r: 0.298, g: 0.686, b: 0.314 }, // Green
    iconId: 'public_characters_5',
    attachments: [checklistPaso5SandboxId]
  });





  const textElement = document.getElementById('text') as HTMLDivElement;
  const sensor = await sdk.Sensor.createSensor(sdk.Sensor.SensorType.CAMERA);
  sensor.showDebug(true);
  sensor.readings.subscribe({
    onCollectionUpdated: (sourceCollection) => {
      const inRange: unknown[] = [];
      for (const [source, reading] of sourceCollection) {
        if (reading.inRange) {
          const search = inRange.find((element) => {
            return element === source.userData.id;
          });
          if (!search) {
            inRange.push(source.userData.id);
          }
        }
        console.log('sensor id', source.userData.id, 'inRange', reading.inRange, 'inView', reading.inView);
      }
      if (inRange.length > 0) {
        setMessage(textElement, inRange.toString());
      } else {
        clearMesssage(textElement);
      }
    },
  });
  const sourcePromises: Promise<any>[] = [];
  for (const desc of sourceDescs) {
    switch (desc.type as MpSdk.Sensor.SourceType) {
      case sdk.Sensor.SourceType.BOX:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.BOX, desc.options));
        break;
      // Example of handling a sphere source and setting types correctly.
      case sdk.Sensor.SourceType.SPHERE:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.SPHERE, desc.options));
        break;
      // Example of handling a cylinder source and setting types correctly.
      case sdk.Sensor.SourceType.CYLINDER:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.CYLINDER, desc.options));
        break;
    }
    switch (desc.type) {
      case sdk.Sensor.SourceType.BOX:
        sourcePromises.push(sdk.Sensor.createSource(<MpSdk.Sensor.SourceType.BOX>desc.type, desc.options));
        break;
      // Example of handling a sphere source and setting types correctly.
      case sdk.Sensor.SourceType.SPHERE:
        sourcePromises.push(sdk.Sensor.createSource(<MpSdk.Sensor.SourceType.SPHERE>desc.type, desc.options));
        break;
      // Example of handling a cylinder source and setting types correctly.
      case sdk.Sensor.SourceType.CYLINDER:
        sourcePromises.push(sdk.Sensor.createSource(<MpSdk.Sensor.SourceType.CYLINDER>desc.type, desc.options));
        break;
    }
  }
  const sources = await Promise.all(sourcePromises);
  sensor.addSource(...sources);
};
main();
