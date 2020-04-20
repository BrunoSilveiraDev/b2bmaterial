import React, { useEffect, useState } from "react";
import api from "../../services/api";
import * as _ from "lodash";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import logoImg from "../../assets/b2b-logopreto@300x-8.png";
import { useHistory } from "react-router-dom";
import "./edit.css";
import * as Yup from "yup";

const ProfileEdit = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [profile, setProfile] = useState({});
  const [updatingProfile, setUpdatingProfile] = useState("");

  const history = useHistory();
  const token = JSON.parse(localStorage.getItem("currentToken"));
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const updateProfile = async (profileChanges) => {
    setUpdatingProfile(true);
    //const token = await getTokenSilently();
    if (profile._id) {
      api
        .put(`profiles/${profile._id}`, profileChanges, config)
        .then((response) => {
          setUpdatingProfile(false);
          setProfile(response.data);
        });
    } else {
      api.post(`profiles`, profileChanges, config).then((response) => {
        setUpdatingProfile(false);
        setProfile(response.data);
      });
    }
  };

  const findProfile = async (userId) => {
    if (userId) {
      setUpdatingProfile(true);
      api.get(`profiles/user/${userId}`, config).then((response) => {
        setUpdatingProfile(false);
        console.log("response", response);
        if (response.data.profile) {
          setProfile(response.data.profile);
        } else {
          setProfile({});
        }
      });
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const currentUser = user ? JSON.parse(user) : null;
    setCurrentUser(currentUser);
    console.log("Current User", currentUser);

    findProfile(currentUser.id);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="logo" />
        <span>{_.startCase(currentUser.name)}</span>

        <button
          className="button-back-to-list"
          onClick={() => {
            history.push("/");
          }}
        >
          <AiOutlineClose size={23} color="#fff" />
        </button>
      </header>
      <h1 className="h1-update-profile">Atualizar Perfil</h1>
      <h2 className="h1-update-profile">Dados Básicos</h2>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: profile.name || "",
          email: profile.email || "",
          cidade: profile.cidade || "",
          estado: profile.estado || "",
          pais: profile.pais || "",
          cnpj: profile.cnpj || "",
          materials: profile.materials || [],
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(100, "No máximo 100 letras")
            .required("Obrigatório"),
          cidade: Yup.string().required("Obrigatório"),
          email: Yup.string()
            .email("Endereço de email inválido")
            .required("Obrigatório"),
          materials: Yup.array().of(
            Yup.object().shape({
              name: Yup.string()
                .min(2, "Nome muito curto")
                .required("Obrigatório"),
            })
          ),
        })}
        onSubmit={(values) => {
          console.log(
            "Enviado para o backend",
            JSON.stringify(values, null, 2)
          );
          updateProfile(values);
        }}
        render={({ values, errors, touched, dirty, isValid, handleReset }) => {
          return (
            <Form>
              <label htmlFor="name">Nome Perfil</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />

              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />

              <label htmlFor="cidade">Cidade</label>
              <Field type="text" name="cidade" />
              <ErrorMessage name="cidade" component="div" />

              <label htmlFor="estado">Estado</label>
              <Field type="text" name="estado" />
              <ErrorMessage name="estado" component="div" />

              <label htmlFor="pais">País</label>
              <Field type="text" name="pais" />
              <ErrorMessage name="pais" component="div" />

              <label htmlFor="cnpj">CNPJ</label>
              <Field type="text" name="cnpj" />
              <ErrorMessage name="pais" component="div" />

              <h2 className="h1-update-profile">Materiais</h2>
              <FieldArray
                name="materials"
                render={({ insert, remove, push }) => (
                  <div>
                    {values.materials.length > 0 &&
                      values.materials.map((material, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <label htmlFor={`materials.${index}.name`}>
                              Name
                            </label>
                            <Field
                              name={`materials.${index}.name`}
                              placeholder="Nome do material"
                              type="text"
                              autoComplete="nope"
                            />
                            {errors.materials &&
                              errors.materials[index] &&
                              errors.materials[index].name &&
                              touched.materials &&
                              touched.materials[index].name && (
                                <div className="field-error">
                                  {errors.materials[index].name}
                                </div>
                              )}
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              className="button"
                              onClick={() => remove(index)}
                            >
                              Remover Material
                            </button>
                          </div>
                        </div>
                      ))}
                    <button
                      type="button"
                      className="button"
                      onClick={() => push({ name: "" })}
                    >
                      Novo material
                    </button>
                  </div>
                )}
              />
              <br />
              <br />
              <button
                type="submit"
                className="button"
                disabled={!dirty || !isValid}
              >
                Salvar Alterações
              </button>
              <Link type="button" className="button" to="/">
                Cancelar
              </Link>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default ProfileEdit;
