export const vm = document.querySelector('.form-detail2').__vue__

/**
 * 今日是否已经提交过
 * @return {boolean}
 */
export function isSubmit() {
  return vm.hasFlag === '1'
}
