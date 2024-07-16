import { inject, Injectable } from "@angular/core";
import { EpicService } from "../services/epic.service";
import { Epic } from "../interfaces/project";
import { EpicPayload } from "../interfaces/epic";
import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class EpicFacade {
  epicFacade = inject(EpicService);
  storageService = inject(StorageService);

  epicId!: number;
  
  getEpics() {
    return this.epicFacade.getEpics();
  }

  getEpic(id: number) {
    return this.epicFacade.getEpic(id);
  }

  createEpic(epic: EpicPayload) {
    return this.epicFacade.createEpic(epic);
  }

  updateEpic(epic: Epic) {
    return this.epicFacade.updateEpic(epic);
  }

  deleteEpic(id: number) {
    return this.epicFacade.deleteEpic(id);
  }

  setEpicId(id: number) {
    this.epicId = id;
    this.storageService.setItem('epicId', this.epicId);
  }

  getEpicId(): number {
    return this.storageService.getItem('epicId');
  }
}