// ©️ 2024 DerCoderJo. All Rights Reserved.

import * as Minecraft from "@minecraft/server"


Minecraft.world.afterEvents.playerPlaceBlock.subscribe((data) => {
    if (!data.player.hasTag("instantTNT")) return

    var blocklocation = `${data.block.location.x} ${data.block.location.y} ${data.block.location.z}`

    if (data.block.typeId == "minecraft:tnt") {
        data.player.runCommandAsync(`setblock ${blocklocation} air`)
        data.player.runCommandAsync(`summon tnt ${blocklocation}`)
    }
})

Minecraft.world.afterEvents.entitySpawn.subscribe((data) => {
    let entity = data.entity
    if (data.entity.typeId == "minecraft:tnt") {
        let timer = 40
        let inter = Minecraft.system.runInterval(() => {
            try {
                timer -= 1

                entity.nameTag = `${timer / 10} Seconds`
            } catch { return Minecraft.system.clearRun(inter) }
        }, 2)
    }
})

Minecraft.system.beforeEvents.watchdogTerminate.subscribe((data) => data.cancel = true)

Minecraft.world.afterEvents.worldInitialize.subscribe(() => {
    console.warn("[§r§cInstant §4T§fN§4T§r] Loaded Addon")
})
