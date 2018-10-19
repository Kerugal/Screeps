// import modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');

var HOME = 'W8N3';

module.exports.loop = function () {

    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'longDistanceHarvester') {
            roleLongDistanceHarvester.run(creep);
        }
    }

    var towers = Game.rooms[HOME].find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }

    var minimumNumberOfHarvesters = 1;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 1;
    var minimumNumberOfWallRepairers = 1;
    var minimumNumberOfLongDistanceHarvestersW3N5 = 1;
    var minimumNumberOfLongDistanceHarvestersW2N4 = 1;

    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
    var numberOfLongDistanceHarvestersW3N5 = _.sum(Game.creeps, (c) =>
        c.memory.role == 'longDistanceHarvester' && c.memory.target == 'W8N2');
    var numberOfLongDistanceHarvestersW2N4 = _.sum(Game.creeps, (c) =>
        c.memory.role == 'longDistanceHarvester' && c.memory.target == 'W7N3');

    var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
    var name = undefined;

    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            name = Game.spawns.Spawn1.createCustomCreep(
                Game.spawns.Spawn1.room.energyAvailable, 'harvester');
        }
    }
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'wallRepairer');
    }
    else if (numberOfLongDistanceHarvestersW3N5 < minimumNumberOfLongDistanceHarvestersW3N5) {
        name = Game.spawns.Spawn1.createLongDistanceHarvester(energy, 5, HOME, 'W8N2', 0);
    }
    else if (numberOfLongDistanceHarvestersW2N4 < minimumNumberOfLongDistanceHarvestersW2N4) {
        name = Game.spawns.Spawn1.createLongDistanceHarvester(energy, 3, HOME, 'W7N3', 0);
    }
    else {
        name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }

    if (!(name < 0)) {
        console.log("Spawned new creep: " + name + " || Role: " + Game.creeps[name].memory.role);
    }
};