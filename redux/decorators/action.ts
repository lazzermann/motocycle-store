import { Entity } from "../models/entity"
import { action as act} from "../models/actions"

const action = () => {
    return (target: any, propertyKey: string) => {
        const entityName = target.constructor.name
        const entityItem = entityName in Entity.actions ? Entity.actions[entityName] : {}
        if(!(propertyKey in entityItem)){
            entityItem[propertyKey] = {
                trigger : (data) => act(propertyKey.toUpperCase(), data)
            }
        }
        Entity.actions[entityName] = entityItem
    }
};

export default action;