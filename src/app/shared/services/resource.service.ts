import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

interface IResourceBaseObject {
  id?: string;
}

type ResourceType<T> = T & IResourceBaseObject;

@Injectable({
  providedIn: 'root',
})
export class ResourceService<T> {
  public http = inject(HttpClient);

  public resources = signal<ResourceType<T>[]>([]);

  protected setResources = (resources: ResourceType<T>[]) => {
    this.resources.set(resources);
  };

  protected upsertResource = (resource: ResourceType<T>) => {
    const index = this.resources().findIndex(todo => todo.id === resource.id);

    if (index === -1) {
      this.resources.set([...this.resources(), resource]);
      return;
    }

    this.resources.update(resources =>
      resources.map(todo => (todo.id === resource.id ? resource : todo))
    );
  };

  protected removeResource = (id: string) => {
    this.resources.set(this.resources().filter(resource => resource.id !== id));
  };
}
