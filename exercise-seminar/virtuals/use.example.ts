/**
 * ✨ ESTRATEGIA: VIRTUALS (RECOMENDADO)
 * 
 * La relación se calcula en tiempo de ejecución. 
 * ¡Imposible que se desincronice!
 */

import Organization from './organization.example';
import User from './user.example';

const ejemploUso = async () => {
    // 1. Crear una organización
    const org = await Organization.create({ name: 'Google' });

    // 2. Crear usuarios asociados a esa organización
    await User.create({ name: 'Pol', organization: org._id });
    await User.create({ name: 'Juan', organization: org._id });

    // 3. OBTENER LA ORGANIZACIÓN CON SUS USUARIOS (Sin haberlos guardado en el array)
    // Usamos .populate('nombreDeLaVirtual')
    const orgWithUsers = await Organization.findById(org._id).populate('myUsers');
    
    console.log(orgWithUsers);
    /** El objeto devuelto se vería algo así:
    {
        _id: "...",
        name: "Google",
        myUsers: [
            { _id: "...", name: "Pol", organization: "..." },
            { _id: "...", name: "Juan", organization: "..." }
        ]
    }
    */
}
