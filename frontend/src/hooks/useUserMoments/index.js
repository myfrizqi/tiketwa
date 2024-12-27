import api from "../../services/api";
import toastError from "../../errors/toastError";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
// import { SocketContext } from "../../context/Socket/SocketContext";

const useUserMoments = () => {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);
  const [isUpdate, setIsUpdate] = useState([]);
  const { user, socket } = useContext(AuthContext);


  useEffect(() => {
    (async () => {
      try {
        if (update) {
          const { data } = await api.get("/usersMoments");

          setUsers(data);
          setUpdate(false);
        }
      } catch (err) {
        if (err.response?.status !== 500) {
          toastError(err);
        } else {
          toast.error(`${i18n.t("frontEndErrors.getUsers")}`);
        }
      }
    })();
  }, [update]);

  useEffect(() => {
    if (user.id && socket) { // Comprueba si user.id y socket están definidos
      const companyId = user.companyId;
      
      const onTicketEvent = (data) => {
        if (isUpdate !== data) {
          setIsUpdate(data)
          setUpdate(prevUpdate => !prevUpdate); // Utilice el valor de actualización anterior
        }
      }
      const onAppMessage = (data) => {
        if (isUpdate !== data) {
          setIsUpdate(data)
          setUpdate(prevUpdate => !prevUpdate); // Utilice el valor de actualización anterior
        }
      };
  
      socket.on(`company-${companyId}-ticket`, onTicketEvent);
      socket.on(`company-${companyId}-appMessage`, onAppMessage);
      return () => {
        socket.off(`company-${companyId}-ticket`, onTicketEvent);
        socket.off(`company-${companyId}-appMessage`, onAppMessage);
      };
    }
  }, [user.id, socket]); // Dependencias especificadas aquí  

  return { users };
};

export default useUserMoments;
