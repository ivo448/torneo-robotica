import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { CATEGORIAS } from "../config/constants";

// Mapeo de categorías a nombres de colecciones en Firestore
const COLLECTION_NAMES = {
  [CATEGORIAS.SUMO]: "sumo",
  [CATEGORIAS.CARRERA]: "carrera",
  [CATEGORIAS.SHOWCASE]: "showcase",
  [CATEGORIAS.NOMBRE]: "mejorNombre",
};

export const guardarEnFirestore = async (categoria, datos, juez) => {
  const coleccionNombre = COLLECTION_NAMES[categoria];

  const datosCompletos = {
    ...datos,
    juez: juez,
    timestamp: serverTimestamp(),
  };

  await addDoc(collection(db, coleccionNombre), datosCompletos);
};

export const suscribirseAResultados = (callbacks) => {
  const colecciones = ["sumo", "carrera", "showcase", "mejorNombre"];
  const unsubscribers = [];

  colecciones.forEach((nombreColeccion) => {
    const q = query(
      collection(db, nombreColeccion),
      orderBy("timestamp", "desc"),
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const datos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp:
            doc.data().timestamp?.toDate().toLocaleString("es-CL") || "N/A",
        }));

        const keyEstado =
          nombreColeccion === "mejorNombre" ? "nombre" : nombreColeccion;
        callbacks.onSuccess(keyEstado, datos);
      },
      (error) => {
        console.error(`Error al escuchar ${nombreColeccion}:`, error);
        callbacks.onError(nombreColeccion);
      },
    );

    unsubscribers.push(unsubscribe);
  });

  return () => {
    unsubscribers.forEach((unsub) => unsub());
  };
};
