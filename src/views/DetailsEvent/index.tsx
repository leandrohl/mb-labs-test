import { useEffect, useState, useRef } from "react";
import { ScrollView, Text, View, SafeAreaView } from "react-native";
import { Modalize } from "react-native-modalize";
import Icon from "../../assets/icons";
import IconButton from "../../components/Buttons/IconButton";
import ModalizeBuyTicket from "./components/BuyTicket";
import firestore from '@react-native-firebase/firestore';

import * as S from './styles'
import { useAuth } from "../../contexts/Auth";
import { IEvent, ITicket } from "../../services/types";
import api from "../../services/axios";
import Snackbar from "react-native-snackbar";
import Loading from "../../components/Loading";
import { useTheme } from "styled-components/native";

interface IParams {
  event: IEvent
}

export default function DetailsEvent( { navigation, route }) {
  const { event } = route.params as IParams
  const [eventSelected, setEventSelected] = useState<IEvent>(event)
  const [loading, setLoading] = useState(false)

  const modalizeRef = useRef<Modalize>(null)
  const database = firestore();
  const { user, signed } = useAuth()
  const theme = useTheme()

  
  const handleAddTicket = () => {
    setLoading(true)
    if (!signed) {
      Snackbar.show({
        text: 'Para comprar esse ingresso, você precisa estar autenticado.',
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: "Login",
          onPress: () => navigation.navigate("Login"),
          textColor: theme.colors.primary
        }
      })
      setLoading(false)
      return
    }

    database.collection(user.userId).add({
      event: eventSelected,
      dateBuy: new Date().toLocaleDateString('pt-br')
    } as ITicket)
    navigation.navigate("Ingressos")
    setLoading(false)
  }

  if (loading) return <Loading />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <S.Container>
        <ScrollView>
          <IconButton iconName="ArrowBack" handleClick={() => navigation.goBack()}/>
          <S.Logo source={{
            uri: `${eventSelected.imageUrl}`
          }}/>
          <S.Content>
            <S.TextTitle> {eventSelected.name} </S.TextTitle>
            <S.Info>
              <Icon name="Calendar" height={20} width={20}/>
              <S.TextInfo>{eventSelected.date} </S.TextInfo>
            </S.Info>
            <S.Info>
              <Icon name="Location" height={20} width={20}/>
              <S.TextInfo>{eventSelected.local} </S.TextInfo>
            </S.Info>
            <S.Info>
              <Icon name="Groups" height={20} width={20}/>
              <S.TextInfo>{eventSelected.organization} </S.TextInfo>
            </S.Info>
            <S.Info>
              <Icon name="Payments" height={20} width={20}/>
              <S.TextInfo>{eventSelected.price} </S.TextInfo>
            </S.Info>
            <View>
              <S.TitleDescription> Descrição do evento </S.TitleDescription>
              <S.TextDescription> {eventSelected.description} </S.TextDescription>
            </View>
          </S.Content>
        </ScrollView>
      </S.Container>
      <S.ButtonBuy onPress={() => modalizeRef.current?.open()}>
        <S.TextBuy>Comprar Ingresso</S.TextBuy>
      </S.ButtonBuy>
      <ModalizeBuyTicket
        modalizeRef={modalizeRef}
        confirmBuyTicket={handleAddTicket}
      />
    </SafeAreaView>
  );
}
