/**
 * ❌ ESTRATEGIA: VECTOR MANUAL (NO RECOMENDADA)
 * 
 * En este ejemplo vemos la cantidad de código extra y el riesgo que 
 * supone mantener la base de datos sincronizada "a mano".
 */
import OrganizationManual from './organization.manual';
import UserManual from './user.manual';

const createUserWithManualSynchronization = async (name: string, orgId: string) => {
    // 1. Crear el usuario
    const newUser = await UserManual.create({ name, organization: orgId });

    // ⚠️ RIESGO: Si la aplicación se cae aquí, el usuario existe pero la organización NO lo conoce.
    await OrganizationManual.findByIdAndUpdate(orgId, { 
        $push: { users: newUser._id }
    });

    console.log("Usuario creado y guardado en el vector de la organización");
};

const deleteUserWithManualSynchronization = async (userId: string) => {
    // 1. Buscar al user para saber a qué organización pertenece
    const user = await UserManual.findById(userId);
    if (!user) return;

    const orgId = user.organization;

    // 2. Borrar el user
    await UserManual.findByIdAndDelete(userId);

    // ⚠️ RIESGO: Si falla este paso, la organización tendrá un ID que apunta a la nada ("ID Huérfano").
    await OrganizationManual.findByIdAndUpdate(orgId, { 
        $pull: { users: userId }
    });

    console.log("Usuario borrado y su ID eliminado del vector de la organización");
};

const changeUserOfOrganizationManual = async (userId: string, nuevaOrgId: string) => {
    const user = await UserManual.findById(userId);
    if (!user) return;

    const viejaOrgId = user.organization;

    // 1. Actualizar user
    user.organization = nuevaOrgId as any;
    await user.save();

    // 2. TRABAJO EXTRA: Quitar de la vieja
    await OrganizationManual.findByIdAndUpdate(viejaOrgId, { $pull: { users: userId } });

    // 3. TRABAJO EXTRA: Añadir a la nueva
    await OrganizationManual.findByIdAndUpdate(nuevaOrgId, { $push: { users: userId } });
    
    console.log("Sincronización manual completa al mover de empresa");
};
