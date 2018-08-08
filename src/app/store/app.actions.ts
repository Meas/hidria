export class SetComparison {
  static readonly type = '[app] set comparison';
  constructor(public payload: {}[]) {}
}

export class UnsetComparison {
  static readonly type = '[app] unset comparison';
  constructor(public payload: number) {}
}

export class ClearComparison {
  static readonly type = '[app] clear comparison';
}
