
import type { MpSdk } from 'embedtypes/sdk';
import { clearMesssage, connect, setMessage } from '../common';
import '../common/main.css';
import sourceDescs from './sources.json';

// ── Checklist data ────────────────────────────────────────────────
interface StepData {
  title: string;
  color: string;
  objective: string;
  items: string[];
}

const STEPS: Record<string, StepData> = {
  'paso-1': {
    title: '📋 Paso 1: Notificación y Autorización',
    color: '#ffaa00',
    objective: 'Asegurar que el área sabe que el equipo se va a detener.',
    items: [
      '<strong>Identificar equipo:</strong> Confirmar visualmente el equipo a intervenir (ej. Molino SAC 3).',
      '<strong>Tomar equipo de comunicación:</strong> Interactuar con la radio en la mesa de inicio.',
      '<strong>Contactar al encargado:</strong> Solicitar por radio la detención operativa del equipo.',
      '<strong>Recibir autorización:</strong> Escuchar la confirmación de detención por parte del jefe de turno antes de avanzar.',
    ],
  },
  'paso-2': {
    title: '📋 Paso 2: Identificación de Fuentes de Energía',
    color: '#00aaff',
    objective: 'Encontrar el punto exacto donde se debe cortar la energía.',
    items: [
      '<strong>Navegar a la sala eléctrica:</strong> Dirigirse al área de tableros.',
      '<strong>Localizar tablero general:</strong> Identificar el panel principal que alimenta el equipo.',
      '<strong>Ubicar el interruptor específico:</strong> Leer las etiquetas del tablero para encontrar la palanca exacta.',
    ],
  },
  'paso-3': {
    title: '📋 Paso 3: Aislamiento',
    color: '#ff4444',
    objective: 'Cortar físicamente el flujo de energía.',
    items: [
      '<strong>Posicionamiento:</strong> Situarse frente al interruptor identificado en el paso anterior.',
      '<strong>Accionar mecanismo:</strong> Bajar la palanca o girar el interruptor a la posición de apagado ("OFF").',
      '<strong>Confirmación sensorial:</strong> Validar el corte mediante el feedback visual (luces apagadas) y auditivo.',
    ],
  },
  'paso-4': {
    title: '📋 Paso 4: Recolección y Dispositivos de Bloqueo',
    color: '#f1c40f',
    objective: 'Obtener las herramientas personales de seguridad.',
    items: [
      '<strong>Ir a la estación de bloqueo:</strong> Desplazarse hacia la caja de seguridad amarilla (SafeLockout).',
      '<strong>Tomar pinza múltiple (hasp):</strong> Retirar la pinza de la caja.',
      '<strong>Tomar candado personal:</strong> Retirar el candado asignado al trabajador.',
      '<strong>Tomar tarjeta de peligro:</strong> Retirar la etiqueta y confirmar que los datos (nombre, fecha, motivo) estén visibles.',
    ],
  },
  'paso-5': {
    title: '📋 Paso 5: Bloqueo y Etiquetado',
    color: '#2ecc71',
    objective: 'Bloquear físicamente el interruptor para que nadie pueda encenderlo por error.',
    items: [
      '<strong>Regresar al punto de corte:</strong> Volver al tablero aislado en el Paso 3.',
      '<strong>Instalar pinza:</strong> Colocar la pinza en los orificios de bloqueo de la palanca.',
      '<strong>Instalar candado:</strong> Insertar el candado cerrando la pinza.',
      '<strong>Instalar tarjeta:</strong> Enganchar la tarjeta de advertencia de "PELIGRO" junto al candado.',
    ],
  },
};

// ── Custom Panel helpers ──────────────────────────────────────────
function openCustomPanel(stepKey: string): void {
  const panel = document.getElementById('custom-panel');
  const body  = document.getElementById('custom-panel-body');
  const titleEl = document.getElementById('custom-panel-title');
  if (!panel || !body || !titleEl) return;

  const step = STEPS[stepKey];
  if (!step) return;

  titleEl.textContent = stepKey.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  const itemsHtml = step.items
    .map(item => `<li><input type="checkbox"> <span>${item}</span></li>`)
    .join('');

  body.innerHTML = `
    <h2 class="panel-step-title" style="border-bottom-color:${step.color};">${step.title}</h2>
    <p class="panel-step-objective">${step.objective}</p>
    <ul class="panel-checklist">${itemsHtml}</ul>
  `;

  panel.classList.add('open');
}

function closeCustomPanel(): void {
  const panel = document.getElementById('custom-panel');
  if (panel) panel.classList.remove('open');
}

// ── Main ──────────────────────────────────────────────────────────
const main = async () => {
  const sdk: MpSdk = await connect({
    urlParams: {
      m: 'hXEV8zd9GFy',
      qs: '1',
      play: '1',
      title: '0',
    },
  });

  // Close button
  const closeBtn = document.getElementById('custom-panel-close');
  if (closeBtn) closeBtn.addEventListener('click', closeCustomPanel);

  // Buscador de coordenadas
  sdk.Pointer.intersection.subscribe((intersection) => {
    console.log('📍 COORDENADAS EXACTAS --->', intersection.position);
  });

  // Portal Minverso
  const [minversoSandboxId] = await sdk.Tag.registerSandbox(
    `<iframe src="https://minverso.com/" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"></iframe>`,
    { size: { w: 600, h: 850 } }
  );
  sdk.Tag.add({
    label: 'Portal Web Minverso',
    anchorPosition: { x: -16.836630782669214, y: 1.1608446625154798, z: 4.216808666955651 },
    stemVector: { x: 0, y: 0, z: -0.3 },
    attachments: [minversoSandboxId],
  });

  // ── Tags de pasos (sin sandbox — el panel custom los maneja) ──
  const tagIds: Record<string, string> = {};

  const [id1] = await sdk.Tag.add({
    label: 'Paso 1: Notificación',
    anchorPosition: { x: -20.1439173752873, y: 1.405418092471173, z: 1.722705161011619 },
    stemVector: { x: 0.3, y: 0, z: 0 },
    color: { r: 1.0, g: 0.596, b: 0.0 },
    iconId: 'public_characters_1',
  });
  tagIds[id1] = 'paso-1';

  const [id2] = await sdk.Tag.add({
    label: 'Paso 2: Identificación',
    anchorPosition: { x: -18.9632054059643, y: 1.230397616938383, z: -2.285493963118637 },
    stemVector: { x: 0, y: 0, z: 0.3 },
    color: { r: 0.012, g: 0.663, b: 0.957 },
    iconId: 'public_characters_2',
  });
  tagIds[id2] = 'paso-2';

  const [id3] = await sdk.Tag.add({
    label: 'Paso 3: Aislamiento',
    anchorPosition: { x: -18.034426838887985, y: 1.222983537795993, z: -2.281127506949742 },
    stemVector: { x: 0, y: 0, z: 0.3 },
    color: { r: 0.957, g: 0.263, b: 0.212 },
    iconId: 'public_characters_3',
  });
  tagIds[id3] = 'paso-3';

  const [id4] = await sdk.Tag.add({
    label: 'Paso 4: Recolección y Etiquetas',
    anchorPosition: { x: -12.623932290521346, y: 0.867121838449943, z: -2.625850974736056 },
    stemVector: { x: -0.3, y: 0, z: 0 },
    color: { r: 0.945, g: 0.769, b: 0.059 },
    iconId: 'public_characters_4',
  });
  tagIds[id4] = 'paso-4';

  const [id5] = await sdk.Tag.add({
    label: 'Paso 5: Bloqueo y Etiquetado',
    anchorPosition: { x: -17.48982384704301, y: 1.2687677861740818, z: -2.3042635948142762 },
    stemVector: { x: 0, y: 0, z: 0.3 },
    color: { r: 0.298, g: 0.686, b: 0.314 },
    iconId: 'public_characters_5',
  });
  tagIds[id5] = 'paso-5';

  // Listen for tag open events → show custom dark panel
  sdk.Tag.openTags.subscribe({
    onChanged(openTagIds) {
      if (openTagIds.size === 0) {
        closeCustomPanel();
        return;
      }
      for (const openId of openTagIds) {
        const stepKey = tagIds[openId];
        if (stepKey) {
          openCustomPanel(stepKey);
          return;
        }
      }
    },
  });

  // ── Sensor ────────────────────────────────────────────────────
  const textElement = document.getElementById('text') as HTMLDivElement;
  const sensor = await sdk.Sensor.createSensor(sdk.Sensor.SensorType.CAMERA);
  sensor.showDebug(true);
  sensor.readings.subscribe({
    onCollectionUpdated: (sourceCollection) => {
      const inRange: unknown[] = [];
      for (const [source, reading] of sourceCollection) {
        if (reading.inRange) {
          const search = inRange.find((element) => element === source.userData.id);
          if (!search) inRange.push(source.userData.id);
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
      case sdk.Sensor.SourceType.SPHERE:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.SPHERE, desc.options));
        break;
      case sdk.Sensor.SourceType.CYLINDER:
        sourcePromises.push(sdk.Sensor.createSource(sdk.Sensor.SourceType.CYLINDER, desc.options));
        break;
    }
  }
  const sources = await Promise.all(sourcePromises);
  sensor.addSource(...sources);
};

main();
