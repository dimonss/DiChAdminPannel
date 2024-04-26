import { useCallback } from 'react';
import { contentApi } from 'API/contentApi';
import Swal from 'sweetalert2';
import STRINGS from 'constants/strings';
import { API_RESPONSE_STATUS } from 'types/DTOTypes';

const UseDeletegoodHandler = () => {
    const [deleteGood] = contentApi.useDeleteGoodMutation();

    const errorAlert = useCallback((error: string) => Swal.fire('Ошибка!', error, 'error'), []);

    return useCallback(
        (id: string) => {
            Swal.fire({
                title: STRINGS.ARE_YOU_SURE,
                text: STRINGS.YOU_CANT_RESTORE_IT,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: STRINGS.YES_DELETE,
                cancelButtonText: STRINGS.CANCEL,
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteGood(id)
                        .unwrap()
                        .then((fulfilled) => {
                            if (fulfilled.status === API_RESPONSE_STATUS.OK) {
                                Swal.fire({
                                    title: STRINGS.DELETED,
                                    text: STRINGS.GOOD_DELETED_SUCCESSFULLY,
                                    icon: 'success',
                                });
                            } else {
                                errorAlert(STRINGS.UNKNOWN_ERROR);
                            }
                        })
                        .catch((rejected) => {
                            errorAlert(STRINGS.UNKNOWN_ERROR);
                            console.error(rejected);
                        });
                }
            });
        },
        [deleteGood, errorAlert],
    );
};

export default UseDeletegoodHandler;
