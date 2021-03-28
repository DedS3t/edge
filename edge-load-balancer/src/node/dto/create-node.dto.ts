export class CreateNodeDto {
  readonly jwt: string;
  readonly host: string;
  readonly port: number;
  readonly mem_avail: number; // in kb
  readonly cpu_avail: number; // in cpu points
}