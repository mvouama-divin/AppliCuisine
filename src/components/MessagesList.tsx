
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Mail, 
  ChefHat, 
  Lightbulb, 
  AlertTriangle,
  Eye,
  CheckCircle,
  Trash2
} from 'lucide-react';
import { ContactMessage } from '@/hooks/useContactMessages';

interface MessagesListProps {
  messages: ContactMessage[];
  onUpdateStatus: (id: string, status: ContactMessage['status']) => void;
  onDeleteMessage: (id: string) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages, 
  onUpdateStatus, 
  onDeleteMessage 
}) => {
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'recette': return <ChefHat className="w-4 h-4" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4" />;
      case 'probleme': return <AlertTriangle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'nouveau':
        return <Badge variant="destructive">Nouveau</Badge>;
      case 'lu':
        return <Badge variant="secondary">Lu</Badge>;
      case 'traité':
        return <Badge className="bg-green-500">Traité</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">Aucun message</h3>
            <p className="text-gray-600">Les messages des utilisateurs apparaîtront ici.</p>
          </CardContent>
        </Card>
      ) : (
        messages.map((message) => (
          <Card key={message.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {getMessageIcon(message.type)}
                  <div>
                    <CardTitle className="text-lg">{message.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{message.email}</span>
                      <span>•</span>
                      <span>{formatDate(message.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(message.status)}
                  <Badge variant="outline" className="capitalize">
                    {message.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {message.recipe_request && (
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <ChefHat className="w-4 h-4 text-orange-600" />
                      <span className="font-semibold text-orange-800">Demande de recette</span>
                    </div>
                    <p className="text-orange-700">{message.recipe_request}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold mb-2">Message :</h4>
                  <p className="text-gray-700 leading-relaxed">{message.message}</p>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  {message.status === 'nouveau' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(message.id, 'lu')}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Marquer comme lu
                    </Button>
                  )}
                  
                  {message.status === 'lu' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(message.id, 'traité')}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Marquer comme traité
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDeleteMessage(message.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default MessagesList;
